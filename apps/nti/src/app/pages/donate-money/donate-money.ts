import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedValidators } from '../../shared/components/validators/common';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { RegisterProvider } from '../../users/providers/register';
import { SuiModalService, ModalSize } from 'ng2-semantic-ui';
import { ConfirmModal } from '../../shared/container/modals/admin-model';
import { ConfirmModalDonor } from '../../shared/container/modals/donor-popUp';
import { GenericDonor } from '../../shared/services/generic-donor/generic-donor';


@Component({
    selector: 'app-nti-donate-money',
    templateUrl: './donate-money.html',
    styleUrls: ['./donate-money.less'],
})

export class DonateMoneyComponent implements OnDestroy {
    private unsubscribe$: Subject<void> = new Subject<void>();

    donateForm: FormGroup;
    formSubmitAttempt = false;

    // Add Registering details
    error: string | null;
    pending: boolean;
    firstDayOfWeek = 0;
    mode: any;
    bankNames: any[];
    selectedOption: any;
    donateFor: any[];
    donorForChange = false;

    constructor(private fb: FormBuilder,
        private route: Router,
        private _register: RegisterProvider,
        private modalService: SuiModalService,
        private donorProfile:GenericDonor) {

        this.donateForm = this.fb.group({
            phoneNumber: ['', [Validators.required, SharedValidators.strongPhone]],
            email: ['', [Validators.required, SharedValidators.email]],
            fullName: ['', Validators.required],
            bankName: ['', Validators.required],
            transactionDate: ['', Validators.required],
            transationAmount: ['', Validators.required],
            transactionId: ['', Validators.required],
            donorFor: ['', Validators.required],
            donatingFor:[''],
        });

        this.bankNames = [
            {
                id: 'GTB',
                name: 'GTBank'
            },
            {
                id: 'FirstBank',
                name: 'First Bank'
            },
        ];

        this.donateFor = [
            {
                id: 'anonymous',
                name: 'Anonymous'
            },
            {
                id: '',
                name: 'In Honour Of'
            },
            {
                id: '',
                name: 'In Memory Of'
            },
        ];

        this.donationGuide();
        this.donorProfile.getDonors(1)
    }

    get donors(): any {
        return this.donorProfile.donors;
    }
    set donors(value: any) {
        this.donorProfile.donors = value;
    }

    get loadingScroll(): any {
        return this.donorProfile.loadingScroll;
    }
    set loadingScroll(value: any) {
        this.donorProfile.donors = value;
    }


    isFieldValid(field: string) {
        return (
            (!this.donateForm.get(field).valid &&
                this.donateForm.get(field).touched) ||
            (!this.donateForm.get(field).valid && this.formSubmitAttempt)
        );
    }

    displayFieldCss(field: string) {
        return {
            error: this.isFieldValid(field)
        };
    }

    donorforChange(event:any) {
        const donoF = event;
        if (donoF.indexOf('Anonymous') !== -1) {
            this.donorForChange = false;
        }
        else {
            this.donorForChange = true;
        }
    }

    donationGuide() {
        this.modalService
            .open(new ConfirmModalDonor('HOW TO MAKE A DONATION TO TARS.', ModalSize.Tiny))
            .onApprove(() => { })
            .onDeny(() => { });
    }


    successful() {
        const message = ' We will get back to you within the next 24hrs to confirm your payment status. Thank you!';
        this.modalService
            .open(new ConfirmModal('Thank you for donating for the relief support campaigns.', message, ModalSize.Tiny))
            .onApprove(() => { this.redirect(); })
            .onDeny(() => { });
    }


    redirect() {
        this.route.navigate(['/home']);
    }


    submit() {
        this.error = null;
        this.pending = true;
        this.formSubmitAttempt = false;
        if (this.donateForm.valid) {
            this._register.registerDonor({ body: this.donateForm.value }).pipe(
                takeUntil(this.unsubscribe$))
                .subscribe((res) => {
                    this.pending = false;
                    this.donateForm.reset();
                    this.successful();
                }, error => {
                    this.formSubmitAttempt = false;
                    this.pending = false;
                    this.error = error.error.error;
                });
        } else {
            this.pending = false;
            this.formSubmitAttempt = true;
        }
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
