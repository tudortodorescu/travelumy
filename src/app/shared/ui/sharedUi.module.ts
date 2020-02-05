import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { ActionBarComponent } from './components/action-bar/action-bar.component';
import { AppIconComponent } from './components/app-icon/app-icon.component';

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
    providers: [],
    schemas: [NO_ERRORS_SCHEMA]
})
export class SharedUiModule { }
