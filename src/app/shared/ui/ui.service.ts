import { Injectable, ViewContainerRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NavigateService } from './services/navigate/navigate.service';

@Injectable({ providedIn: 'root' })
export class UIService {
    private _drawerState = new BehaviorSubject<void>(null);
    private _rootVCRef: ViewContainerRef;

    constructor(
        private navigateService: NavigateService
    ) { }

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

    navigateTo(destinationUrl: string, transitionEffect?: string, clearHistory?: boolean): void {
        this.navigateService.navigateTo(destinationUrl, transitionEffect, clearHistory);
    }

    goBack(): void {
        this.navigateService.goBack();
    }

    goHome(): void {
        this.navigateService.goHome();
    }

    goLogin(): void {
        this.navigateService.goLogin();
    }

    canGoBack(): boolean {
        return this.navigateService.canGoBack();
    }

}
