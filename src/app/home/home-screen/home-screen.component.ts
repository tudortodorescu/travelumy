import { Component, OnInit, OnDestroy } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { UIService } from '~/app/shared/ui/ui.service';
import { UiRouterTransitionEffect } from '~/app/shared/common';
import { AuthService } from '~/app/auth/auth.service';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { User } from '~/app/auth/user.model';

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

    get user(): User {
        return this._user;
    }

    get isAuth(): boolean {
        if (!!this._user) {
            return this.user.isAuth;
        }
        return false;
    }

    landscapeList: LandscapeModel[] = [
        {
            landscapeImage: 'https://www.aboutaustralia.com/wp-content/uploads/2011/09/Fiji_Travel_Packages.jpg',
            landscapeCaption: 'Visit Beautiful Fiji'
        },
        {
            landscapeImage: 'https://www.telegraph.co.uk/content/dam/Travel/leadAssets/31/92/mauritius1_3192576a.jpg',
            landscapeCaption: 'Mauritius Islands'
        },
        {
            landscapeImage: 'https://img.theculturetrip.com/768x432/wp-content/uploads/2017/09/9399060187_e512258e37_o.jpg',
            landscapeCaption: 'Tropical Philippines'
        },
        {
            landscapeImage: 'https://www.thetimes.co.uk/static/s3/thetimes-page-builder-prod/uploads/2017/06/YULE-IMAGE-2.jpg',
            landscapeCaption: 'Thailand Paradise'
        }
    ];

    constructor(
        private page: Page,
        private uiService: UIService,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.page.actionBarHidden = true;
        this._subscriptionList.push(
            this.authService.user.pipe(filter(data => !!data)).subscribe((user: User) => {
                this._user = user;
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
        this.uiService.navigateTo('auth/login', UiRouterTransitionEffect.slideRight);
    }

    onRegister() {
        this.uiService.navigateTo('auth/register', UiRouterTransitionEffect.slideRight);
    }

    onLogout() {
        this.authService.logout();
    }

}
