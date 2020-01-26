import { Injectable } from "@angular/core";
import { UiRouterTransitionEffect } from "~/app/shared/common";
import { Router } from "@angular/router";
import { RouterExtensions } from "nativescript-angular/router";
import { NavigationOptions } from '@nativescript/angular/router/ns-location-strategy';

@Injectable()
export class NavigateService {
    private readonly _defaultTransition = UiRouterTransitionEffect.slideRight;
    private _previousRoute: any;
    private _previousAnimation: string = '';

    constructor(
        private router: Router,
        private routerExtensions: RouterExtensions
    ) { }

    get previousRoute() {
        return this._previousRoute;
    }

    set previousRoute(route) {
        this._previousRoute = route;
    }

    get previousAnimation(): string {
        return this._previousAnimation;
    }

    set previousAnimation(route: string) {
        this._previousAnimation = route;
    }

    private _switchTransitionEffect(transitionEffect: string): UiRouterTransitionEffect {
        let animation: UiRouterTransitionEffect;
        switch(transitionEffect) {
            case 'curl': animation = UiRouterTransitionEffect.curl; break;
            case 'curlUp': animation = UiRouterTransitionEffect.curlUp; break;
            case 'curlDown': animation = UiRouterTransitionEffect.curlDown; break;
            case 'explode': animation = UiRouterTransitionEffect.explode; break;
            case 'fade': animation = UiRouterTransitionEffect.fade; break;
            case 'flip': animation = UiRouterTransitionEffect.flip; break;
            case 'flipRight': animation = UiRouterTransitionEffect.flipRight; break;
            case 'flipLeft': animation = UiRouterTransitionEffect.flipLeft; break;
            case 'slide': animation = UiRouterTransitionEffect.slide; break;
            case 'slideLeft': animation = UiRouterTransitionEffect.slideLeft; break;
            case 'slideRight': animation = UiRouterTransitionEffect.slideRight; break;
            case 'slideBottom': animation = UiRouterTransitionEffect.slideBottom; break;
            case 'slideTop': animation = UiRouterTransitionEffect.slideTop; break;
            default: animation = this._defaultTransition; break;
        }
        return animation;
    }

    navigateTo(
        destinationUrl: string,
        transitionEffect?: string,
        clearHistory?: boolean
    ) {
        const animation = this._switchTransitionEffect(transitionEffect);
        this.previousRoute = this.router.url;
        this.previousAnimation = animation;

        this.routerExtensions.navigate([destinationUrl], <NavigationOptions>{
            transition: { name: animation },
            animated: !!animation,
            clearHistory: clearHistory
        });
    }

    goBack(): void {
        if (this.previousRoute) {
            if (this.previousRoute.indexOf('(') !== -1 || this.previousRoute.indexOf(':') !== -1) {
                this.previousRoute = '/';
            }

            const destinationUrl = this.previousRoute;
            this.previousRoute = this.router.url;

            this.routerExtensions.navigate([destinationUrl], <NavigationOptions>{
                transition: { name: this.previousAnimation },
                animated: !!this.previousAnimation,
                clearHistory: false
            });
        }
    }

    goHome(): void {
        this.routerExtensions.navigate(['/home'], <NavigationOptions>{
            transition: { name: UiRouterTransitionEffect.fade },
            animated: true,
            clearHistory: true
        });
    }

    goLogin(): void {
        this.previousRoute = null;
        this.routerExtensions.navigate(['/auth/login'], {
            transition: { name: UiRouterTransitionEffect.slideBottom },
            animated: true,
            clearHistory: true
        });
    }

    canGoBack(): boolean {
        return !!this.previousRoute;
    }
}
