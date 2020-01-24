import { Component, OnInit, OnDestroy, ElementRef, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TextField } from 'tns-core-modules/ui/text-field';
import { AuthService } from '../auth.service';
import { UiRouterTransitionEffect } from '~/app/shared/ui/common';
import { UIService } from '~/app/shared/ui/ui.service';

@Component({
    selector: 'ns-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
    private _subscriptionList: Subscription[] = [];
    form: FormGroup;
    isLoading: boolean = false;
    emailControlIsValid: boolean = true;
    passwordControlIsValid: boolean = true;
    @ViewChild('passwordEl', { static: false }) passwordEl: ElementRef<TextField>;
    @ViewChild('emailEl', { static: false }) emailEl: ElementRef<TextField>;

    constructor(
        private authService: AuthService,
        private changeDetection: ChangeDetectorRef,
        private uiService: UIService
    ) { }

    ngOnInit() {
        this.form = new FormGroup({
            email: new FormControl(null, {
                updateOn: 'blur',
                validators: [
                    Validators.required,
                    Validators.email
                ]
            }),
            password: new FormControl(null, {
                updateOn: 'blur',
                validators: [
                    Validators.required,
                ]
            })
        });

        this._subscriptionList.push(
            this.form.get('email').statusChanges.subscribe(status => {
                this.emailControlIsValid = status === 'VALID';
            }),
            this.form.get('password').statusChanges.subscribe(status => {
                this.passwordControlIsValid = status === 'VALID';
            })
        )
    }

    ngOnDestroy() {
        if (this._subscriptionList.length > 0) {
            this._subscriptionList.forEach((subscription: Subscription) => {
                subscription.unsubscribe();
            })
        }
    }

    onSubmit() {
        if (!this.form.get('email').valid) this.emailControlIsValid = false;
        if (!this.form.get('password').valid) this.passwordControlIsValid = false;
        if (!this.form.valid) return;

        this.emailEl.nativeElement.dismissSoftInput();
        this.passwordEl.nativeElement.dismissSoftInput();
        this.isLoading = true;
        this.changeDetection.detectChanges();

        const email = this.form.get('email').value;
        const password = this.form.get('password').value;

        this.emailControlIsValid = true;
        this.passwordControlIsValid = true;

        // to be implemented
        // this.authService.signIn(email, password).subscribe(() => {
        //     this.isLoading = false;
        //     this.changeDetection.detectChanges();
        // }, err => {
        //     this.isLoading = false;
        //     this.changeDetection.detectChanges();
        // })

    }

    onForgotPassword() {
        this.uiService.navigateTo('auth/forgot-password', UiRouterTransitionEffect.slideRight);
    }

    onRegister() {
        this.uiService.navigateTo('auth/register', UiRouterTransitionEffect.slideRight);
    }

}
