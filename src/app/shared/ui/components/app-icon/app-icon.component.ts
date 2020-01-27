import { Component, ChangeDetectorRef } from '@angular/core';
import * as app from 'tns-core-modules/application'
import { getOrientation } from 'nativescript-orientation';
import { NavigateService } from '../../services/navigate/navigate.service';

@Component({
    selector: 'ns-app-icon',
    templateUrl: './app-icon.component.html',
    styleUrls: ['./app-icon.component.scss']
})
export class AppIconComponent {
    isPortrait: boolean;

    constructor(
        private navigateService: NavigateService,
        private changeDetector: ChangeDetectorRef
    ) {
        this.isPortrait = (getOrientation() === 'portrait');
        app.on('launch', (event) => this.orientationHandling(event));
        app.on('orientationChanged', (event) => this.orientationHandling(event));
    }

    orientationHandling(event) {
        this.isPortrait = (event.newValue === 'portrait');
        if (!this.changeDetector['destroyed']) {
            this.changeDetector.detectChanges();
        }
    }

    onAppIcon() {
        this.navigateService.goHome();
    }

}
