import { Component, ViewChild, ElementRef, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TextField } from 'tns-core-modules/ui/text-field/text-field';
import { AuthService } from '../auth.service';
import { UIService } from '~/app/shared/ui/ui.service';
import { UiRouterTransitionEffect } from '~/app/shared/ui/common';

@Component({
  selector: 'ns-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
    private _subscriptionList: Subscription[] = [];
    form: FormGroup;
    isLoading: boolean = false;
    firstNameControlIsValid: boolean = true;
    lastNameControlIsValid: boolean = true;
    emailControlIsValid: boolean = true;
    passwordControlIsValid: boolean = true;
    @ViewChild('firstNameEl', { static: false }) firstNameEl: ElementRef<TextField>;
    @ViewChild('lastNameEl', { static: false }) lastNameEl: ElementRef<TextField>;
    @ViewChild('emailEl', { static: false }) emailEl: ElementRef<TextField>;
    @ViewChild('passwordEl', { static: false }) passwordEl: ElementRef<TextField>;

    constructor(
        private authService: AuthService,
        private changeDetection: ChangeDetectorRef,
        private uiService: UIService
    ) { }

    ngOnInit() {
        this.form = new FormGroup({
            firstName: new FormControl(null, {
                updateOn: 'blur',
                validators: [
                    Validators.required
                ]
            }),
            lastName: new FormControl(null, {
                updateOn: 'blur',
                validators: [
                    Validators.required
                ]
            }),
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
                    Validators.minLength(6)
                ]
            })
        });

        this._subscriptionList.push(
            this.form.get('firstName').statusChanges.subscribe(status => {
                this.firstNameControlIsValid = status === 'VALID';
            }),
            this.form.get('lastName').statusChanges.subscribe(status => {
                this.lastNameControlIsValid = status === 'VALID';
            }),
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
        if (!this.form.get('firstName').valid) this.firstNameControlIsValid = false;
        if (!this.form.get('lastName').valid) this.lastNameControlIsValid = false;
        if (!this.form.get('email').valid) this.emailControlIsValid = false;
        if (!this.form.get('password').valid) this.passwordControlIsValid = false;
        if (!this.form.valid) return;

        this.emailEl.nativeElement.dismissSoftInput();
        this.passwordEl.nativeElement.dismissSoftInput();

        this.isLoading = true;
        this.changeDetection.detectChanges();

        const firstName = this.form.get('firstName').value;
        const lastName = this.form.get('lastName').value;
        const email = this.form.get('email').value;
        const password = this.form.get('password').value;

        this.firstNameControlIsValid = true;
        this.lastNameControlIsValid = true;
        this.emailControlIsValid = true;
        this.passwordControlIsValid = true;

        // to be implemented
        // this.authService.signUp(firstName, lastName, email, password).subscribe(() => {
        //     this.isLoading = false;
        //     this.changeDetection.detectChanges();
        // }, err => {
        //     this.isLoading = false;
        //     this.changeDetection.detectChanges();
        // })

    }

    onTermsAndConditions() {
        console.log('onTermsAndConditions()');
        this.uiService.navigateTo('auth/terms-and-conditions', UiRouterTransitionEffect.slideTop);
    }

    onPrivacyPolicy() {
        console.log('onPrivacyPolicy()');
        this.uiService.navigateTo('auth/privacy-policy', UiRouterTransitionEffect.slideTop);
    }

}
