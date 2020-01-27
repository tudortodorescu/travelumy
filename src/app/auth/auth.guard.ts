import { UrlSegment, Route, CanLoad } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from './user.model';
import { NavigateService } from '../shared/ui/services/navigate/navigate.service';

@Injectable()
export class AuthGuard implements CanLoad {

    constructor(
        private authService: AuthService,
        private navigateService: NavigateService
    ) { }

    canLoad(route?: Route, segments?: UrlSegment[]): Observable<boolean> {
        return this.authService.user.pipe(
            take(1),
            switchMap((currentUser: User) => {
                if (!currentUser || !currentUser.token) {
                    return this.authService.autoLogin();
                }
                return of(true);
            }),
            tap((isAuth: boolean) => {
                if (!isAuth) {
                    this.navigateService.goLogin();
                }
            })
        )
    }
}
