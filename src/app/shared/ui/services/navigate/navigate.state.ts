import { NavigateTransitionEffect } from "./navigate.service";

export class NavigateState {

    constructor(
        private readonly _route: string,
        private readonly _animation: NavigateTransitionEffect
    ) {
    }

    get route(): string {
        if (this._route.indexOf('(') !== -1 || this._route.indexOf(':') !== -1) {
            return '/home';
        }
        return this._route;
    }

    get animation() {
        return this._animation;
    }

}
