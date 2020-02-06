import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { SearchFilterService } from '../searchFilter.service';
import { GoogleLocationModel } from '../google-location/google-location.component';
import { Page } from 'tns-core-modules/ui/page/page';
import { DatePicker } from 'tns-core-modules/ui/date-picker';
import { NavigateService } from '~/app/shared/ui/services/navigate/navigate.service';

export interface SelectDatesModel {
  checkinDate: Date,
  checkoutDate: Date
}

@Component({
  selector: 'ns-select-dates',
  templateUrl: './select-dates.component.html',
  styleUrls: ['./select-dates.component.scss']
})
export class SelectDatesComponent implements OnInit {
  @ViewChild('fromDateEl', { static: false }) fromDateEl: DatePicker;
  @ViewChild('toDateEl', { static: false }) toDateEl: DatePicker;
  location: GoogleLocationModel;
  dates: SelectDatesModel;
  readonly today = new Date();
  readonly oneday = (60 * 60 * 24 * 1000);
  checkinDate: Date = null;
  checkoutDate: Date = null;
  fromMinDate: Date;
  fromMaxDate: Date;
  toMinDate: Date;
  toMaxDate: Date;
  showAlert: boolean = false;
  showAlertTimeout: any;
  fromYear: string = '';
  fromMonth: string = '';
  fromDay: string = '';
  toYear: string = '';
  toMonth: string = '';
  toDay: string = '';
  totalDays: number = 0;

  constructor(
    private page: Page,
    private navigateService: NavigateService,
    private changeDetector: ChangeDetectorRef,
    private searchFilterService: SearchFilterService
  ) { }

  ngOnInit() {
    this.page.actionBarHidden = true;
    this.location = this.searchFilterService.getLocation();

    this.dates = this.searchFilterService.getDates();
    if (this.dates) {
      this.checkinDate = this.dates.checkinDate || null;
      this.checkoutDate = this.dates.checkoutDate || null;
      this._setYearMonthDay();
      this._checkAlert();
      this._calculateTotalDays();
    }

    this.fromMinDate = new Date(new Date().setDate(this.today.getDate()));
    this.fromMaxDate = new Date(new Date().getTime() + (2 * 12 * 30 * this.oneday));

    this.toMinDate = [this.fromMinDate][0];
    this.toMaxDate = [this.fromMaxDate][0];
  }

  validDates(): boolean {
    return (this.checkinDate !== null && this.checkoutDate !== null);
  }

  hideTotalDaysLabel(): boolean {
    return (!this.validDates() || this.showAlert || (this.totalDays <= 0));
  }

  private _setYearMonthDay() {
    if (this.checkinDate !== null) {
      this.fromYear = (this.checkinDate.getFullYear()).toString();
      this.fromMonth = (this.checkinDate.getMonth() + 1).toString();
      this.fromDay = (this.checkinDate.getDate()).toString();
    }
    if (this.checkoutDate !== null) {
      this.toYear = (this.checkoutDate.getFullYear()).toString();
      this.toMonth = (this.checkoutDate.getMonth() + 1).toString();
      this.toDay = (this.checkoutDate.getDate()).toString();
    }
  }

  private _dc() {
    this.changeDetector.detectChanges();
  }

  private _checkAlert() {
    if (this.validDates()) {
      this.showAlert = (this.checkinDate.getTime() + this.oneday > this.checkoutDate.getTime());
      this._dc();
    }
  }

  private _checkValidArgs(v: string | Date, min: Date, max: Date): boolean {
    return (v !== 'Invalid Date' && min < v && v < max);
  }

  private _calculateTotalDays() {
    if (this.validDates() && !this.showAlert) {
      this.totalDays = Math.round((this.checkoutDate.getTime() - this.checkinDate.getTime()) / this.oneday);
    }
  }

  onFromDateChanged(args) {
    if (this._checkValidArgs(args.value, this.fromMinDate, this.fromMaxDate)) {
      const fromDate: Date = args.value;
      this.checkinDate = fromDate;
      this._checkAlert();
      this._calculateTotalDays();
    }
  }

  onToDateChanged(args) {
    if (this._checkValidArgs(args.value, this.toMinDate, this.toMaxDate)) {
      const toDate: Date = args.value;
      this.checkoutDate = toDate;
      this._checkAlert();
      this._calculateTotalDays();
    }
  }

  showResultsBtn() {
    return (this.checkinDate && this.checkoutDate
      && (this.checkoutDate > this.checkinDate));
  }

  onViewResults() {
    console.log('onViewResults() - navigate to listing view');
  }

  onNoDates() {
    console.log('onNoDates() - navigate to listing view');

    this.checkinDate = null;
    this.checkoutDate = null;
    this.showAlert = false;
    this.totalDays = 0;
  }

  onChangeLocation() {
    this.searchFilterService.setDates({
      checkinDate: this.checkinDate,
      checkoutDate: this.checkoutDate
    });
    this.navigateService.goBack();
  }

}
