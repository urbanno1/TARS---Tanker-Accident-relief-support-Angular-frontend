import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { GenericProfile } from '../../../shared/services/generic-profile/generic-profile';
import { SharedService } from '../../../shared/services/shared';
import { Router, ActivatedRoute } from '@angular/router';
import { AppFilter } from '../../models/filters/filter';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { StateProvider } from '../../providers/state';
import { SuiModalService, ModalSize } from 'ng2-semantic-ui';
import { tap, map, takeUntil } from 'rxjs/operators';
import { Victim } from '../../models/Victim';
import { ConfirmModal } from '../../../shared/container/modals/admin-model';

@Component({
    selector: 'app-nti-admin-edit-victim',
    templateUrl: './admin-edit-victim.html',
    styleUrls: ['../../admin.less'],
})

export class AdminEditVictimComponent implements OnDestroy {
    private unsubscribe$: Subject<void> = new Subject<void>();

    victimParams: AppFilter
    public search = new FormControl();

    victimForm: FormGroup;
    error: string | null
    message: string
    selected: boolean = true;
    pending: boolean = false
    fieldsCollapse = false;
    states: any[];
    lgas: any[];
    cities: any[];
    victimId;
    victimFirst;
    victimLast;
    victimPhone;
    victim:any;
    public baseUrl;
    formSubmitAttempt:boolean;
    searchFilter = {
        groupOp: "AND",
        rules: [
            {
                field: "FirstName",
                op: "cn",
                data: ""
            },
        ]
    }

    generalProfileStatusPercentage: any = 60;
    generalPhotoStatusPercentage: any = 40;

    constructor(
        private stateProvider: StateProvider,
        private modalService: SuiModalService,
        public roleService: SharedService,
        private route: Router,
        private activatedRoute: ActivatedRoute,
        private baseService: SharedService,
        private fb: FormBuilder
    ) {
        this.baseUrl = this.baseService.baseUrl;
        this.activatedRoute.params.pipe(
            takeUntil(this.unsubscribe$)
        ).subscribe(params => {
            this.victimId = params['id']
            this.victimFirst = params['firstName']
            this.victimLast = params['lastName']
            this.victimPhone = params['phoneNumber']
            this.getVictimProfile();
        });

        this.victimForm = this.fb.group({
            stateId: [''],
            lgaId: [''],
            cityId: [''],
            street: [''],
            incidentDate: [''],
            incidentType: [''],
            incidentDescription: [''],
            homeAddress: [''],

    })
}

    getVictimProfile() {
        this.error = null;
        this.pending = true
        this.stateProvider.getVictimProfile({ victimId: this.victimId }).pipe(
            map(res => res.Data),
            takeUntil(this.unsubscribe$))
            .subscribe(res => {
                this.pending = false
                this.victim = res
            },
                error => {
                    this.pending = false
                    this.error = error.error.error
                })
    }

    ClearStreet(event)
    {
        if(event != null)
        {
            this.victim.Victim.Street = 'NULL'
        }
    }
    ClearHome(event)
    {
        if(event != null)
        {
            this.victim.Victim.HomeAddress = 'NULL'
        }
    }
    submit() {
        this.error = null;
        this.pending = true;
        console.log(this.victim.Victim)
        console.log(this.victim)
            this.stateProvider.AdminAddProfile({ body: this.victim.Victim }).pipe(
                takeUntil(this.unsubscribe$))
                .subscribe((res) => {
                    this.pending = false;
                    this.victimForm.reset();
                    this.successful();
                }, error => {
                    this.pending = false;
                    this.error = error.error;
                });
        } 

    successful() {
        const message = 'The victim can now be able to edit his profile.';
        this.modalService
            .open(new ConfirmModal('Profile unlocked!', message, ModalSize.Tiny))
            .onApprove(() => { this.back('event'); })
            .onDeny(() => { });
    }

    isFieldValid(field: string) {
        return (
            (!this.victimForm.get(field).valid &&
                this.victimForm.get(field).touched) 
                ||(!this.victimForm.get(field).valid && this.formSubmitAttempt)
        );
    }

    displayFieldCss(field: string) {
        return {
            error: this.isFieldValid(field)
        };
    }


    back(event) {
        if (event != null) {
            this.route.navigate(['/admin/dashboard']);
        }
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}

