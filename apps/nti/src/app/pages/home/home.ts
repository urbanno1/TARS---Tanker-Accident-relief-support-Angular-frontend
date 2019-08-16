import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { SharedValidators } from '../../shared/components/validators/common'
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs/Subject';
import { RegisterProvider } from '../../users/providers/register';
import { ConfirmModal } from '../../shared/container/modals/admin-model';
import { SuiModalService, ModalSize } from 'ng2-semantic-ui';

@Component({
    selector: 'nti-home',
    templateUrl: './home.html',
    styleUrls: ['./home.less'],
})

export class Home implements OnDestroy, OnInit {
    private unsubscribe$: Subject<void> = new Subject<void>();

    loadingScroll = false;
    registerForm: FormGroup;
    loginForm: FormGroup;

    formSubmitAttempt = false;

    files: any[] = [];
    selectedFile: File = null;
    selectedFile1: File;

    // Add Registering details
    success: boolean;
    error: string | null;
    pending: boolean;

    constructor(private fb: FormBuilder,
        private route: Router,
        private _register: RegisterProvider, private modalService: SuiModalService) {

        this.registerForm = this.fb.group({
            password: ['', [Validators.required, SharedValidators.strongPassword]],
            phoneNumber: ['', [Validators.required, SharedValidators.strongPhone]],
            email: ['', [Validators.required, SharedValidators.email]],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
        })
    }

    isFieldValid(field: string) {
        return (
            (!this.registerForm.get(field).valid &&
                this.registerForm.get(field).touched) ||
            (!this.registerForm.get(field).valid && this.formSubmitAttempt)
        );
    }

    displayFieldCss(field: string) {
        return {
            error: this.isFieldValid(field)
        };
    }

    onFileChange1(event) {
        this.selectedFile1 = null;
        this.selectedFile1 = event.target.files;
        if (this.files.length <= 3) {
            this.files.push(this.selectedFile1);
        }
    }

    successful() {
        const message = 'Kindly complete your profile to enable us validate your claim.';
        this.modalService
            .open(new ConfirmModal('Registration Successful!', message, ModalSize.Tiny))
            .onApprove(() => { this.redirect() })
            .onDeny(() => { });
    }

    redirect() {
        this.route.navigate(['/login'])
        return
    }

    submit() {
        this.success = false;
        this.error = null;
        this.pending = true;
        this.formSubmitAttempt = false;
        if (this.registerForm.valid) {
            this._register.addRegister({ body: this.registerForm.value }).pipe(
                takeUntil(this.unsubscribe$))
                .subscribe((data: any) => {
                    if (data.Succeeded === true) {
                        this.pending = false;
                        this.success = true;
                        this.successful();
                        this.registerForm.reset();
                    } else {
                        this.formSubmitAttempt = false;
                        this.pending = false;
                        this.error = data.Errors[0];
                    }
                });
        } else {
            this.pending = false;
            this.formSubmitAttempt = true;
        }
    }

    registerNow() {
    }

    register() {
        this.loadingScroll = true;
        this.route.navigate(['/users'])
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
    ngOnInit(){}
}