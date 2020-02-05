import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { SharedUiModule } from '../shared/ui/sharedUi.module';
import { Routes } from '@angular/router';
import { GoogleLocationComponent } from './google-location/google-location.component';
import { SelectDatesComponent } from './select-dates/select-dates.component';

const routes: Routes = [
    {
        path: '',
        component: HomeScreenComponent
    },
    {
        path: 'google-location',
        component: GoogleLocationComponent
    },
    {
        path: 'select-dates',
        component: SelectDatesComponent
    }
];

@NgModule({
    declarations: [
        HomeScreenComponent,
        GoogleLocationComponent,
        SelectDatesComponent
    ],
    imports: [
        NativeScriptCommonModule,
        NativeScriptHttpClientModule,
        NativeScriptRouterModule.forChild(routes),
        NativeScriptFormsModule,
        ReactiveFormsModule,
        SharedUiModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule { }
