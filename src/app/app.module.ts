import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeScreenComponent } from './home/home-screen/home-screen.component';
import { ActionBarComponent } from './shared/ui/action-bar/action-bar.component';
import { AuthModule } from "./auth/auth.module";

@NgModule({
    imports: [
        NativeScriptModule,
        AuthModule,
        AppRoutingModule
    ],
    declarations: [AppComponent, HomeScreenComponent, ActionBarComponent],
    schemas: [NO_ERRORS_SCHEMA],
    bootstrap: [AppComponent]
})
export class AppModule { }
