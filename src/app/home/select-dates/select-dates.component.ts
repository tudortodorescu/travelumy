import { Component, OnInit } from '@angular/core';
import { SearchFilterService } from '../searchFilter.service';
import { GoogleLocationModel } from '../google-location/google-location.component';

@Component({
  selector: 'ns-select-dates',
  templateUrl: './select-dates.component.html',
  styleUrls: ['./select-dates.component.scss']
})
export class SelectDatesComponent implements OnInit {
  location: GoogleLocationModel;

  constructor(
    private searchFilterService: SearchFilterService
  ) { }

  ngOnInit() {
    this.location = this.searchFilterService.getLocation();
  }

}
