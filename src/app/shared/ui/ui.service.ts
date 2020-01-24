import { Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { UiRouterTransitionEffect } from '../common';
import { RouterExtensions } from 'nativescript-angular/router';
import { NavigationOptions } from '@nativescript/angular/router/ns-location-strategy';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class UIService {
    private _drawerState = new BehaviorSubject<void>(null);
    private _rootVCRef: ViewContainerRef;
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

    get drawerState() {
        return this._drawerState.asObservable();
    }

    toggleDrawer() {
        this._drawerState.next(null);
    }

    setRootVCRef(vcRef: ViewContainerRef) {
        this._rootVCRef = vcRef;
    }

    getRootVCRef() {
        return this._rootVCRef;
    }

    navigateTo(
        destinationUrl: string,
        transitionEffect: UiRouterTransitionEffect,
        clearHistory?: boolean
    ) {
        this.previousRoute = this.router.url;
        this.previousAnimation = transitionEffect;

        this.routerExtensions.navigate([destinationUrl], <NavigationOptions>{
            transition: { name: transitionEffect },
            animated: !!transitionEffect,
            clearHistory: clearHistory
        });
    }

    goBack() {
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

    goHome() {
        this.routerExtensions.navigate([''], <NavigationOptions>{
            transition: { name: UiRouterTransitionEffect.fade },
            animated: true,
            clearHistory: true
        });
    }

    goLogin() {
        this.previousRoute = null;
        this.routerExtensions.navigate(['/auth/login'], {
            transition: { name: UiRouterTransitionEffect.slideBottom },
            animated: true,
            clearHistory: true
        });
    }

}
