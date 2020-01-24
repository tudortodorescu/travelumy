import { Component, ViewRef, ChangeDetectorRef } from '@angular/core';
import { UIService } from '../ui.service';
import { UiRouterTransitionEffect } from '../../common';
import * as app from 'tns-core-modules/application'
import { getOrientation } from 'nativescript-orientation';

@Component({
    selector: 'ns-app-icon',
    templateUrl: './app-icon.component.html',
    styleUrls: ['./app-icon.component.scss']
})
export class AppIconComponent {
    isPortrait: boolean;

    constructor(
        private uiService: UIService,
        private changeDetector: ChangeDetectorRef,
        // private view: ViewRef
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
        this.uiService.navigateTo('home', UiRouterTransitionEffect.fade);
    }

}
