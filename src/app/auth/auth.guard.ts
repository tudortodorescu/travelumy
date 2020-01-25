import { UrlSegment, Route, CanLoad } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take, switchMap, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { User } from './user.model';
import { UIService } from '../shared/ui/ui.service';

@Injectable()
export class AuthGuard implements CanLoad {

    constructor(
        private authService: AuthService,
        private uiService: UIService
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
                    this.uiService.goLogin();
                }
            })
        )
    }
}
