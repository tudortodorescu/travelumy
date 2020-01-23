import { Component, OnInit } from '@angular/core';
import { Page } from 'tns-core-modules/ui/page/page';
import { UIService } from '~/app/shared/ui/ui.service';

interface LandscapeModel {
    landscapeImage: string;
    landscapeCaption: string;
}
@Component({
    selector: 'ns-home-screen',
    templateUrl: './home-screen.component.html',
    styleUrls: ['./home-screen.component.scss']
})
export class HomeScreenComponent implements OnInit {

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
        private uiService: UIService
    ) { }

    ngOnInit() {
        this.page.actionBarHidden = true;
    }

    onLogin() {
        this.uiService.navigateTo('auth-login', true, 'slideRight');
        // [nsRouterLink]="['auth-login']"
        // pageTransition="slideRight"
    }

}
