import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { ActionBarComponent } from './action-bar/action-bar.component';
import { AppIconComponent } from './app-icon/app-icon.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptRouterModule
    ],
    declarations: [
        ActionBarComponent,
        AppIconComponent
    ],
    exports: [
        ActionBarComponent,
        AppIconComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SharedUiModule { }
