import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TextField } from 'tns-core-modules/ui/text-field/text-field';
import { AuthService } from '../auth.service';
import { UIService } from '~/app/shared/ui/ui.service';
import { RouterExtensions } from 'nativescript-angular/router';

@Component({
    selector: 'ns-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
    private _subscriptionList: Subscription[] = [];
    form: FormGroup;
    isLoading: boolean = false;
    emailControlIsValid: boolean = true;
    @ViewChild('emailEl', { static: false }) emailEl: ElementRef<TextField>;

    constructor(
        private router: RouterExtensions,
        private authService: AuthService,
        private changeDetection: ChangeDetectorRef,
        private uiService: UIService
    ) { }

    ngOnInit() {
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

        // to be implemented
        // this.authService.forgotPassword(email).subscribe(() => {
        //     this.isLoading = false;
        //     this.changeDetection.detectChanges();
        // }, err => {
        //     this.isLoading = false;
        //     this.changeDetection.detectChanges();
        // })

    }



}
