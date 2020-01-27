import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TextField } from 'tns-core-modules/ui/text-field/text-field';
import { AuthService } from '../auth.service';
import { UNKNOWN_ERROR_DEFAULT_MESSAGE } from '~/app/shared/common';
import { NavigateService } from '~/app/shared/ui/services/navigate/navigate.service';

@Component({
    selector: 'ns-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
    private _subscriptionList: Subscription[] = [];
    form: FormGroup;
    isLoading: boolean = false;
    isCompletedRequest: boolean;
    emailControlIsValid: boolean = true;
    @ViewChild('emailEl', { static: false }) emailEl: ElementRef<TextField>;

    constructor(
        private authService: AuthService,
        private changeDetection: ChangeDetectorRef,
        private navigateService: NavigateService
    ) { }

    ngOnInit() {
        this.isCompletedRequest = false;
        this.form = new FormGroup({
            email: new FormControl(null, {
                updateOn: 'change',
                validators: [
                    Validators.required,
                    Validators.email
                ]
            })
        });
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

    onSubmit() {
        if (!this.form.get('email').valid) {
            this.emailControlIsValid = false;
        }
        if (!this.form.valid) return;

        this.emailEl.nativeElement.dismissSoftInput();
        this.isLoading = true;
        this.changeDetection.detectChanges();

        const email = this.form.get('email').value;
        this.emailControlIsValid = true;

        this.authService.forgotPassword(email).subscribe((result: boolean) => {
            if (!result) alert(UNKNOWN_ERROR_DEFAULT_MESSAGE);
            this.isCompletedRequest = true;
            this._setIsLoading(false);
        }, err => this._setIsLoading(false));

    }

    onGoBack() {
        this.navigateService.goLogin();
    }

}
