import { Injectable } from "@angular/core";
import { GoogleLocationModel } from "./google-location/google-location.component";
import { SelectDatesModel } from "./select-dates/select-dates.component";

@Injectable({
    providedIn: 'root'
})
export class SearchFilterService {
    private _location: GoogleLocationModel;
    private _dates: SelectDatesModel;
    
    setLocation(location: GoogleLocationModel): void {
        this._location = location;
    }

    getLocation(): GoogleLocationModel {
        if (!this._location) {
            return ({} as GoogleLocationModel);
        }
        return this._location;
    }

    setDates(selectDates: SelectDatesModel): void {
        this._dates = selectDates;
    }

    getDates(): SelectDatesModel {
        if (!this._dates) {
            return null;
        }
        return this._dates;
    }

}