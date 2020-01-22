import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeScreenComponent } from './home/home-screen/home-screen.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

@NgModule({
    imports: [
        NativeScriptModule,
        AppRoutingModule
    ],
    declarations: [AppComponent, HomeScreenComponent, LoginComponent, RegisterComponent],
    schemas: [NO_ERRORS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule { }
