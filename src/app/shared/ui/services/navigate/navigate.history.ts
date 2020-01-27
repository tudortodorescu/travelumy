import { NavigateState } from "./navigate.state";
import { Injectable } from "@angular/core";

@Injectable()
export class NavigateHistory {
    private navigateState: NavigateState[] = [];

    pushState(state: NavigateState) {
        this.navigateState.push(state);
    }

    popState(): NavigateState {
        return this.navigateState.pop();
    }

    clearHistory(): void {
        this.navigateState = [];
    }

    hasHistory(): boolean {
        return (this.navigateState.length > 0)
    }

}
