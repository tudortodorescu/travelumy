import { Component, OnInit } from '@angular/core';
import { RouterExtensions } from 'nativescript-angular/router';
import { ActivatedRoute } from '@angular/router';
import { Page } from 'tns-core-modules/ui/page/page';

@Component({
    selector: 'ns-tos-privacy-tabs',
    templateUrl: './tos-privacy-tabs.component.html',
    styleUrls: [
        './tos-privacy-tabs.component.common.scss',
        './tos-privacy-tabs.component.ios.scss',
        './tos-privacy-tabs.component.android.scss'
    ]
})
export class TosPrivacyTabsComponent implements OnInit {

    constructor(
        private routerExtensions: RouterExtensions,
        private activatedRoute: ActivatedRoute,
        private page: Page
    ) { }

    ngOnInit() {
        this.page.actionBarHidden = true;
        setTimeout(() => {
            this.routerExtensions.navigate(
                [{
                    outlets: {
                        termsAndConditions: ['terms-and-conditions'],
                        privacyPolicy: ['privacy-policy']
                    }
                }],
                { relativeTo: this.activatedRoute }
            );
        }, 10);
    }

}
