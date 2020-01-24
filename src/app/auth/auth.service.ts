import { Injectable } from "@angular/core";
import { RegisterData, RegisterService } from "./register/register.service";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, throwError, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { alert } from 'tns-core-modules/ui/dialogs';
import { getUTCLocalDate } from "~/app/shared/common";
import { User, UserModel } from "./user.model";
import { setString, getString, hasKey, remove } from 'tns-core-modules/application-settings';
import { UIService } from "../shared/ui/ui.service";

const FIREBASE_API_KEY = 'AIzaSyB9TrLghrwxBYs8uVtmwJfN1JpCF6YJplY';
const FIREBASE_API_URL = 'https://identitytoolkit.googleapis.com/v1/accounts';
const FIREBASE_API_USERS_URL = 'https://travelumy.firebaseio.com/travelumy/users';

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
                alert('Unknown error. Please check server connection.');
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

    register(registerData: RegisterData) {
        if (!registerData.email || !registerData.password) return;

        return this.httpClient.post(`${FIREBASE_API_URL}:signUp?key=${FIREBASE_API_KEY}`, {
            email: registerData.email,
            password: registerData.password,
            returnSecureToken: true
        } as FirebaseAuthenticateRequest).pipe(
            catchError(errorRes => {
                this._handleError(errorRes.error.error.message);
                return throwError(errorRes);
            }),
            tap((resData: FirebaseAuthenticateResponse) => {
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

                    this.httpClient.put<UserModel>(
                        `${FIREBASE_API_USERS_URL}/${user.id}.json?auth=${user.token}`,
                        user
                    );
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
