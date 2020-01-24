import { NgModule } from "@angular/core";
import { NativeScriptRouterModule } from "nativescript-angular/router";
import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { TermsAndConditionsComponent } from "./tos-privacy-tabs/terms-and-conditions/terms-and-conditions.component";
import { PrivacyPolicyComponent } from "./tos-privacy-tabs/privacy-policy/privacy-policy.component";
import { TosPrivacyTabsComponent } from "./tos-privacy-tabs/tos-privacy-tabs.component";

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path: 'forgot-password',
        component: ForgotPasswordComponent
    },
    {
        path: 'tos-privacy-tabs',
        component: TosPrivacyTabsComponent,
        children: [
            {
                path: 'terms-and-conditions',
                component: TermsAndConditionsComponent,
                outlet: 'termsAndConditions'
            },
            {
                path: 'privacy-policy',
                component: PrivacyPolicyComponent,
                outlet: 'privacyPolicy'
            }
        ]
    }

];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class AuthRoutingModule { }
