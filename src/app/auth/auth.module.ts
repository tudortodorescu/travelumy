import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { NativeScriptCommonModule } from "nativescript-angular/common";
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SharedUiModule } from "../shared/ui/sharedUi.module";
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthRoutingModule } from './auth-routing.module';
import { TermsAndConditionsComponent } from './tos-privacy-tabs/terms-and-conditions/terms-and-conditions.component';
import { PrivacyPolicyComponent } from './tos-privacy-tabs/privacy-policy/privacy-policy.component';
import { TosPrivacyTabsComponent } from './tos-privacy-tabs/tos-privacy-tabs.component';
import { RegisterService } from "./register/register.service";

@NgModule({
    imports: [
        NativeScriptCommonModule,
        NativeScriptFormsModule,
        NativeScriptHttpClientModule,
        ReactiveFormsModule,
        AuthRoutingModule,
        SharedUiModule
    ],
    declarations: [
        LoginComponent,
        RegisterComponent,
        ForgotPasswordComponent,
        TermsAndConditionsComponent,
        PrivacyPolicyComponent,
        TosPrivacyTabsComponent
    ],
    providers: [RegisterService],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AuthModule { }
