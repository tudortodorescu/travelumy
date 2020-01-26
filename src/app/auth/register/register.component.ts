import { Component, ViewChild, ElementRef, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TextField } from 'tns-core-modules/ui/text-field/text-field';
import { AuthService } from '../auth.service';
import { UIService } from '~/app/shared/ui/ui.service';
import { UNKNOWN_ERROR_DEFAULT_MESSAGE } from '~/app/shared/common';
import { RegisterService, RegisterData } from './register.service';

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
        private uiService: UIService,
        private registerService: RegisterService
    ) { }

    ngOnInit() {
       this.form = new FormGroup({
            firstName: new FormControl(null, {
                updateOn: 'change',
                validators: [
                    Validators.required
                ]
            }),
            lastName: new FormControl(null, {
                updateOn: 'change',
                validators: [
                    Validators.required
                ]
            }),
            email: new FormControl(null, {
                updateOn: 'change',
                validators: [
                    Validators.required,
                    Validators.email
                ]
            }),
            password: new FormControl(null, {
                updateOn: 'change',
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
            }),

            this.registerService.registerData.pipe(
                filter(data => !!data)
            ).subscribe((registerData: RegisterData) => {
                this.form.patchValue({
                    firstName: registerData.firstName,
                    lastName: registerData.lastName,
                    email: registerData.email,
                    password: registerData.password
                }, { emitEvent: false });
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

    private _setIsLoading(isLoading: boolean) {
        this.isLoading = isLoading;
        this.changeDetection.detectChanges();
    }

    private _setAllControlsToValid() {
        this.firstNameControlIsValid = true;
        this.lastNameControlIsValid = true;
        this.emailControlIsValid = true;
        this.passwordControlIsValid = true;
    }

    private _buildRegisterData(): RegisterData {
        const registerData = <RegisterData>{
            firstName: (this.form.get('firstName').value || ''),
            lastName: (this.form.get('lastName').value || ''),
            email: (this.form.get('email').value || ''),
            password: (this.form.get('password').value || '')
        };
        return registerData;
    }

    private _checkFormControlsValid() {
        if (!this.form.get('firstName').valid) this.firstNameControlIsValid = false;
        if (!this.form.get('lastName').valid) this.lastNameControlIsValid = false;
        if (!this.form.get('email').valid) this.emailControlIsValid = false;
        if (!this.form.get('password').valid) this.passwordControlIsValid = false;
    }

    private _dismissAllInputs() {
        this.firstNameEl.nativeElement.dismissSoftInput();
        this.lastNameEl.nativeElement.dismissSoftInput();
        this.emailEl.nativeElement.dismissSoftInput();
        this.passwordEl.nativeElement.dismissSoftInput();
    }

    onTosPrivacy() {
        const registerData = this._buildRegisterData();
        this.registerService.setRegisterData(registerData);
        this.uiService.navigateTo('auth/tos-privacy-tabs', 'slideTop');
    }

    onSubmit() {
        this._checkFormControlsValid();
        if (!this.form.valid) return;

        this._dismissAllInputs();
        this._setIsLoading(true);
        this._setAllControlsToValid();

        const registerData = this._buildRegisterData();
        this.authService.register(registerData).subscribe((result: boolean) => {
            if (result === false) alert(UNKNOWN_ERROR_DEFAULT_MESSAGE);

            alert("Congratulations! You just signed-up and have access to all the cool features!");
            this.uiService.goHome();
            this._setIsLoading(false);
        }, err => this._setIsLoading(false))

    }



}
