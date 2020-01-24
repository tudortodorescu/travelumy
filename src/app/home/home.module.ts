import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { HomeScreenComponent } from './home-screen/home-screen.component';
import { SharedUiModule } from "../shared/ui/sharedUi.module";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { Routes } from "@angular/router";

const routes: Routes = [
    {
        path: '',
        component: HomeScreenComponent
    }
];

@NgModule({
    declarations: [HomeScreenComponent],
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule.forChild(routes),
        SharedUiModule
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class HomeModule { }
