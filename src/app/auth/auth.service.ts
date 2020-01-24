import { Injectable } from '@angular/core';
import { RegisterData, RegisterService } from './register/register.service';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { alert } from 'tns-core-modules/ui/dialogs';
import { getUTCLocalDate } from '~/app/shared/common';
import { User, UserModel } from './user.model';
import { setString, getString, hasKey, remove } from 'tns-core-modules/application-settings';
import { UIService } from '../shared/ui/ui.service';
import { FIREBASE_API_KEY, FIREBASE_API_URL, FIREBASE_API_DB, UNKNOWN_ERROR_DEFAULT_MESSAGE } from '~/app/shared/common';



interface FirebaseAuthenticateRequest {
    email: string;
    password: string;
    returnSecureToken: boolean;
}

interface FirebaseAuthenticateResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _user = new BehaviorSubject<User>(null);
    private _tokenExpirationTimer: number;
    private _tempLoginResData: FirebaseAuthenticateResponse;

    constructor(
        private httpClient: HttpClient,
        private uiService: UIService,
        private registerService: RegisterService
    ) { }

    get user() {
        return this._user.asObservable();
    }

    private _handleError(errorMessage: string) {
        switch (errorMessage) {
            case 'EMAIL_EXISTS':
                alert('The email address is already in use by another account.');
                break;
            case 'OPERATION_NOT_ALLOWED':
                alert('Password sign-in is disabled for this project.');
                break;
            case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                alert('We have blocked all requests from this device due to unusual activity. Try again later.');
                break;
            case 'EMAIL_NOT_FOUND':
                alert('There is no user record corresponding to this identifier. The user may have been deleted.');
                break;
            case 'INVALID_PASSWORD':
                alert('The password is invalid or the user does not have a password.');
                break;
            case 'USER_DISABLED':
                alert('The user account has been disabled by an administrator.');
                break;
            default:
                alert(UNKNOWN_ERROR_DEFAULT_MESSAGE);
        }
    }

    autoLogin(): Observable<boolean> {
        if (!hasKey('userData')) {
            return of(false);
        }
        const userData = <UserModel>JSON.parse(getString('userData'));
        const loadedUser = new User(
            userData.firstName,
            userData.lastName,
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
        );
        if (loadedUser.isAuth) {
            this._user.next(loadedUser);
            this.autoLogout(loadedUser.timeToExpiry);
            return of(true);
        }
        return of(false);
    }

    login(email: string, password: string): Observable<boolean> {
        if (!email || !password) return of(false);

        return this.httpClient.post(`${FIREBASE_API_URL}:signInWithPassword?key=${FIREBASE_API_KEY}`, {
            email: email,
            password: password,
            returnSecureToken: true
        } as FirebaseAuthenticateRequest).pipe(
            catchError(errorRes => {
                this._handleError(errorRes.error.error.message);
                return throwError(errorRes);
            }),
            switchMap((resData: FirebaseAuthenticateResponse) => {
                if (resData && resData.idToken) {
                    this._tempLoginResData = resData;

                    return this.httpClient.get(
                        `${FIREBASE_API_DB}/users/${resData.localId}.json?auth=${resData.idToken}`
                    )
                } else {
                    return of(false);
                }
            }),
            switchMap((userData: UserModel) => {
                if (userData && userData.email) {
                    const expirationDate = new Date(
                        getUTCLocalDate().getTime() + (parseInt(this._tempLoginResData.expiresIn) * 1000)
                    );

                    const user = new User(
                        userData.firstName,
                        userData.lastName,
                        userData.email,
                        this._tempLoginResData.localId,
                        this._tempLoginResData.idToken,
                        expirationDate
                    );

                    setString('userData', JSON.stringify(user));
                    this.autoLogout(user.timeToExpiry);
                    this._user.next(user);

                    return of(true);
                } else {
                    return of(false);
                }
            })
        );
    }

    register(registerData: RegisterData): Observable<boolean> {
        if (!registerData.email || !registerData.password) return of(false);

        return this.httpClient.post(`${FIREBASE_API_URL}:signUp?key=${FIREBASE_API_KEY}`, {
            email: registerData.email,
            password: registerData.password,
            returnSecureToken: true
        } as FirebaseAuthenticateRequest).pipe(
            catchError(errorRes => {
                this._handleError(errorRes.error.error.message);
                return throwError(errorRes);
            }),
            switchMap((resData: FirebaseAuthenticateResponse) => {
                if (resData && resData.idToken) {
                    const expirationDate = new Date(
                        getUTCLocalDate().getTime() + (parseInt(resData.expiresIn) * 1000)
                    );

                    const user = new User(
                        registerData.firstName,
                        registerData.lastName,
                        registerData.email,
                        resData.localId,
                        resData.idToken,
                        expirationDate
                    );

                    setString('userData', JSON.stringify(user));
                    this.autoLogout(user.timeToExpiry);
                    this._user.next(user);
                    this.registerService.setRegisterData(null);

                    this.httpClient.put(
                        `${FIREBASE_API_DB}/users/${user.id}.json?auth=${user.token}`, {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email
                    }).subscribe();

                    return of(true);
                } else {
                    return of(false);
                }
            })
        );
    }

    autoLogout(expiryDuration: number) {
        this._tokenExpirationTimer = setTimeout(() => {
            alert('Your session expired. Please login again to continue. Sorry for the inconvenience');
            this.logout();
        }, expiryDuration);
    }

    logout() {
        this._user.next(null);
        remove('userData');
        if (this._tokenExpirationTimer) clearTimeout(this._tokenExpirationTimer);
        this.uiService.goLogin();

    }

}
