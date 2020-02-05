import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GOOGLE_LOCATION_URL, GOOGLE_LOCATION_API_KEY } from '~/app/shared/common';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription, of } from 'rxjs';
import { debounceTime, filter, distinctUntilChanged, switchMap, map } from 'rxjs/operators';
import { Page } from 'tns-core-modules/ui/page/page';
import { NavigateService } from '~/app/shared/ui/services/navigate/navigate.service';
import { SearchFilterService } from '../searchFilter.service';

export interface GoogleLocationModel {
  mainText: string,
  secondaryText: string
}

interface GoogleLocationsResult {
  status: string,
  predictions: any[]
}

@Component({
  selector: 'ns-google-location',
  templateUrl: './google-location.component.html',
  styleUrls: ['./google-location.component.scss']
})
export class GoogleLocationComponent implements OnInit, OnDestroy {
  private _subscriptionList: Subscription[] = [];
  form: FormGroup;
  locations: GoogleLocationModel[] = [];

  constructor(
    private page: Page,
    private httpClient: HttpClient,
    private navigateService: NavigateService,
    private formBuilder: FormBuilder,
    private searchFilterService: SearchFilterService
  ) { }

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.form = this.formBuilder.group({
      location: ['']
    });

    this._subscriptionList.push(
      this.form.get('location').valueChanges.pipe(
        filter((text: string) => {
          if (text.length === 0) return true;
          return (text.length > 2);
        }),
        debounceTime(750),
        distinctUntilChanged(),
        switchMap((location: string) => {
          if (location === '') {
            return of(<GoogleLocationsResult>{
              status: "CLEAR",
              predictions: []
            })
          }
          let url = `${GOOGLE_LOCATION_URL}/place/autocomplete/json`;
          url += `?key=${GOOGLE_LOCATION_API_KEY}&regions=locality&input=${location}`;

          return this.httpClient.get(url);
        }),
        map((result: GoogleLocationsResult)  => {
          const locations: GoogleLocationModel[]  = [];
          if (result.status === 'OK') {
            if (result.predictions.length > 0) {
              result.predictions = (result.predictions.length > 10) 
                ? result.predictions.splice(10) : result.predictions;
              result.predictions.forEach(prediction => {
                if (prediction.structured_formatting 
                    && prediction.structured_formatting.main_text
                    && prediction.structured_formatting.secondary_text) {
                  
                  locations.push(<GoogleLocationModel>{
                    mainText: prediction.structured_formatting.main_text,
                    secondaryText: prediction.structured_formatting.secondary_text
                  });
                }
              });
            }
          }
          return locations;
        })
      ).subscribe((locations: GoogleLocationModel[]) => {
        this.locations = locations;
      })
    );
  }

  ngOnDestroy() {
    if (this._subscriptionList.length > 0) {
      this._subscriptionList.forEach((subscription: Subscription) => {
        subscription.unsubscribe();
      })
    }
  }

  get canGoBack() {
    return this.navigateService.canGoBack();
  }

  onBack() {
    this.navigateService.goBack();
  }

  onSelectLocation(location: GoogleLocationModel) {
    this.searchFilterService.setLocation(location);
    this.navigateService.navigateTo('home/select-dates');
  }
}
