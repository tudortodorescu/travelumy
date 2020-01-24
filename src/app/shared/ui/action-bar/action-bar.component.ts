import { Component, Input } from '@angular/core';
import { Page, isAndroid, isIOS } from 'tns-core-modules/ui/page/page';
import { UIService } from '../ui.service';
import { UiThemeColors } from '../common';

declare var android: any;

@Component({
    selector: 'ns-action-bar',
    templateUrl: './action-bar.component.html',
    styleUrls: ['./action-bar.component.scss']
})
export class ActionBarComponent {
    @Input() title: string;
    @Input() showBackButton: boolean = false;
    @Input() hasMenu: boolean = false;
    @Input() hasHome: boolean = false;
    isAndroid: boolean = isAndroid;
    isIOS: boolean = isIOS;

    constructor(
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
                    android.graphics.Color.parseColor(UiThemeColors.primary),
                    (<any>android.graphics).PorterDuff.Mode.SRC_ATOP
                );
            }
        }
    }

    onGoBack() {
        this.uiService.goBack();
    }

    onToggleMenu() {
        this.uiService.toggleDrawer();
    }

    onHome() {
        this.uiService.goHome();
    }
}
