import { Component, Input } from '@angular/core';
import { Page, isAndroid, isIOS } from 'tns-core-modules/ui/page/page';
import { UIService } from '../../ui.service';
import { UiThemeColors } from '../../../common';
import { NavigateService } from '../../services/navigate/navigate.service';

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
        private uiService: UIService,
        private navigateService: NavigateService
    ) { }

    get canGoBack() {
        return this.showBackButton && this.navigateService.canGoBack();
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

    onToggleMenu() {
        this.uiService.toggleDrawer();
    }

    onBack() {
        this.navigateService.goBack();
    }

    onHome() {
        this.navigateService.goHome();
    }

}
