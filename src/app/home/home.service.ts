import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, of } from "rxjs";
import { switchMap, filter } from "rxjs/operators";
import { FIREBASE_API_DB } from "../shared/common";

export interface LandscapeModel {
    landscapeImage: string;
    landscapeCaption: string;
}

@Injectable({
    providedIn: 'root'
})
export class HomeService {
    private _landscape = new BehaviorSubject<LandscapeModel[]>(null);

    constructor(
        private httpClient: HttpClient
    ) { }

    get landscape() {
        return this._landscape.asObservable();
    }

    fetchLandscape(): Observable<boolean> {
        return this.httpClient.get<LandscapeModel[]>(
            `${FIREBASE_API_DB}/landscape.json`
        ).pipe(
            switchMap((landscape: LandscapeModel[]) => {
                if (!!landscape) {
                    this._landscape.next(landscape);
                    return of(true);
                }
                return of(false);
            })
        );
    }

}
