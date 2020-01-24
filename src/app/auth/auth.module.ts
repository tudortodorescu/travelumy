import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedUiModule } from "../shared/ui/sharedUi.module";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthRoutingModule } from './auth-routing.module';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        SharedUiModule
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        TermsAndConditionsComponent,
        PrivacyPolicyComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AuthModule { }
