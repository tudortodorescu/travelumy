import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedUiModule } from "../shared/ui/sharedUi.module";

@NgModule({
    imports: [
        NativeScriptModule,
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        SharedUiModule
    ],
    declarations: [LoginComponent, RegisterComponent],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AuthModule { }
