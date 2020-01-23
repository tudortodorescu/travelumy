import { Component, Input } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { Page, isAndroid, isIOS } from 'tns-core-modules/ui/page/page';
import { UIService } from '../ui.service';

declare var android: any;

@Component({
    selector: 'ns-action-bar',
    templateUrl: './action-bar.component.html',
    styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent {
    @Input() title: string;
    @Input() showBackButton: boolean = true;
    @Input() hasMenu: boolean = true;
    isAndroid: boolean = isAndroid;
    isIOS: boolean = isIOS;

    constructor(
        private router: RouterExtensions,
        private page: Page,
        private uiService: UIService
    ) { }

    get previousRoute() {
        return this.uiService.previousRoute;
    }

    get canGoBack() {
        return this.showBackButton && this.previousRoute;
    }

    onLoadedActionBar() {
        if (isAndroid) {
            const androidToolbar = this.page.actionBar.nativeView;
            const backButton = androidToolbar.getNavigationIcon();
            if (backButton) {
                backButton.setColorFilter(
                    android.graphics.Color.parseColor('#636363'),
                    (<any>android.graphics).PorterDuff.Mode.SRC_ATOP
                );
            }
        }
    }

    onGoBack() {
        if (this.uiService.previousRoute) {
            this.router.navigate([this.uiService.previousRoute]);
        }
    }

    onToggleMenu() {
        this.uiService.toggleDrawer();
    }
}
