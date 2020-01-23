import { Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

enum RouterTransitionEffect {
    curl, curlUp, curlDown, explode, fade, flip, flipRight, flipLeft, slide, slideLeft, slideRight, slideTop, slideBottom
}

@Injectable({ providedIn: 'root' })
export class UIService {
    private _drawerState = new BehaviorSubject<void>(null);
    private _rootVCRef: ViewContainerRef;
    private _previousRoute: string = '';

    get previousRoute() {
        return this._previousRoute;
    }

    set previousRoute(route: string) {
        this._previousRoute = route;
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
        setPreviousRoute?: boolean,
        transitionEffect?: RouterTransitionEffect,
        clearHistory?: boolean
    ) {
        setPreviousRoute = !!setPreviousRoute || false;
        clearHistory = !!clearHistory || false;

        // 'auth-login', true, 'slideRight'
    }

}
