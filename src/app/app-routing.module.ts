import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from 'nativescript-angular/router';
import { Routes } from '@angular/router';
import { HomeModule } from './home/home.module';
import { AuthModule } from './auth/auth.module';

const routes: Routes = [
    { path: 'home', loadChildren: () => HomeModule },
    { path: 'auth', loadChildren: () => AuthModule },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
