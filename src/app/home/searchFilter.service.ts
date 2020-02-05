import { Injectable } from "@angular/core";
import { GoogleLocationModel } from "./google-location/google-location.component";

@Injectable({
    providedIn: 'root'
})
export class SearchFilterService {
    private _location: GoogleLocationModel;

    setLocation(location: GoogleLocationModel) {
        this._location = location;
    }

    getLocation() {
        return this._location;
    }
}