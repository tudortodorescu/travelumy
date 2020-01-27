import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { UNKNOWN_ERROR_DEFAULT_MESSAGE } from '~/app/shared/common';
import { AuthService } from '~/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { User } from '~/app/auth/user.model';
import { HomeService } from '../home.service';
import { NavigateService } from '~/app/shared/ui/services/navigate/navigate.service';

interface LandscapeModel {
    landscapeImage: string;
    landscapeCaption: string;
}
@Component({
    selector: 'ns-home-screen',
    templateUrl: './home-screen.component.html',
    styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit, OnDestroy {
    private _subscriptionList: Subscription[] = [];
    private _user: User;
    isLoading: boolean = true;
    landscapeList: LandscapeModel[] = [];

    get user(): User {
        return this._user;
    }

    get isAuth(): boolean {
        if (!!this._user) {
            return this.user.isAuth;
        }
        return false;
    }

    constructor(
        private page: Page,
        private changeDetector: ChangeDetectorRef,
        private navigateService: NavigateService,
        private authService: AuthService,
        private homeService: HomeService
    ) { }

    ngOnInit() {
        this.authService.autoLogin();
        this.page.actionBarHidden = true;

        this._subscriptionList.push(
            this.authService.user.pipe(filter(data => !!data)).subscribe((user: User) => {
                this._user = user;
            }),
            this.homeService.fetchLandscape().subscribe((result: boolean) => {
                if (result) {
                    this.isLoading = false;
                    this.changeDetector.detectChanges();

                } else alert(UNKNOWN_ERROR_DEFAULT_MESSAGE);
            }, err => alert(UNKNOWN_ERROR_DEFAULT_MESSAGE)),
            this.homeService.landscape.subscribe((landscape: LandscapeModel[]) => {
                this.landscapeList = landscape;
            })
        );
    }

    ngOnDestroy() {
        if (this._subscriptionList.length > 0) {
            this._subscriptionList.forEach((subscription: Subscription) => {
                subscription.unsubscribe();
            })
        }
    }

    onLogin() {
        this.navigateService.navigateTo('auth/login');
    }

    onRegister() {
        this.navigateService.navigateTo('auth/register');
    }

    onLogout() {
        this.authService.logout();
    }

}
