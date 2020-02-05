import { Injectable, ChangeDetectorRef } from "@angular/core";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { NavigationOptions } from '@nativescript/angular/router/ns-location-strategy';
import { NavigateHistory } from "./navigate.history";
import { NavigateState } from "./navigate.state";

export enum NavigateTransitionEffect {
    curl = 'curl',
    curlUp = 'curlUp',
    curlDown = 'curlDown',
    explode = 'explode',
    fade = 'fade',
    flip = 'flip',
    flipRight = 'flipRight',
    flipLeft = 'flipLeft',
    slide = 'slide',
    slideLeft = 'slideLeft',
    slideRight = 'slideRight',
    slideTop = 'slideTop',
    slideBottom = 'slideBottom'
}

@Injectable({
    providedIn: 'root'
})
export class NavigateService {
    private readonly _defaultTransitionEffect = NavigateTransitionEffect.slideRight;

    constructor(
        private router: Router,
        private routerExtensions: RouterExtensions,
        private navigateHistory: NavigateHistory
    ) { }

    navigateTo(destinationUrl: string, transitionEffect?: NavigateTransitionEffect): void {
        const route: string = this.router.url;
        const animation = transitionEffect || this._defaultTransitionEffect;
        this.navigateHistory.pushState(new NavigateState(route, animation));

        this.routerExtensions.navigate([destinationUrl], <NavigationOptions>{
            transition: { name: animation },
            animated: true,
            clearHistory: false
        });
    }

    goBack(): void {
        if (this.navigateHistory.hasHistory()) {
            const navigateState: NavigateState = this.navigateHistory.popState();
            const route: string = navigateState.route;
            const animation: NavigateTransitionEffect = navigateState.animation;

            this.routerExtensions.navigate([route], <NavigationOptions>{
                transition: { name: animation },
                animated: true,
                clearHistory: false
            });
        }
    }

    goHome(): void {
        this.navigateHistory.clearHistory();
        this.routerExtensions.navigate(['/home'], <NavigationOptions>{
            transition: { name: NavigateTransitionEffect.fade },
            animated: true,
            clearHistory: true
        });
    }

    goLogin(): void {
        this.navigateHistory.clearHistory();
        this.routerExtensions.navigate(['/auth/login'], {
            transition: { name: NavigateTransitionEffect.slideBottom },
            animated: true,
            clearHistory: true
        });
    }

    canGoBack(): boolean {
        return this.navigateHistory.hasHistory();
    }

}
