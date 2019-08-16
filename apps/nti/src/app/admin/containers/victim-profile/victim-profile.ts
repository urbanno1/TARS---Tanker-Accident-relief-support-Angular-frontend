import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { AppFilter } from '../../models/filters/filter';
import { StateProvider } from '../../providers/state';
import { takeUntil, map } from 'rxjs/operators';
import { Country } from '../../models/country';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ConfirmModal } from '../../../shared/container/modals/admin-model';
import { SuiModalService, ModalSize } from 'ng2-semantic-ui';
import { Router } from '@angular/router';
import { Victim } from '../../models/Victim';
import { GenericProfile } from '../../../shared/services/generic-profile/generic-profile';


@Component({
    selector: 'app-admin-victim-profile',
    templateUrl: './victim-profile.html',
    styleUrls: ['../../admin.less']
})

export class VictimProfileComponent implements OnDestroy {
    private unsubscribe$: Subject<void> = new Subject<void>();
    stateParams: AppFilter;
    countryParams: AppFilter;
    public search = new FormControl();
    victimForm: FormGroup;
    // Used for Pagination.
    page = 1;
    total = 0;
    maxSize = 5;
    pageSize = 1;

    error: string | null;
    message: string;
    selected = true;
    pending = false;
    countries: Country[];
    victim: Victim;
    states: any[];
    lgas: any[];
    cities: any[];
    lgaCollapse = false;
    cityCollapse = false;
    fieldsCollapse = false;
    incidentCollapse = false;
    lgasOpen = false;
    formSubmitAttempt:boolean;

    public descriptionCollapse: boolean;

    searchFilter = {
        groupOp: 'AND',
        rules: [
            {
                field: 'Country.Country__Code',
                op: 'eq',
                data: ''
            },
            {
                field: 'state_name',
                op: 'cn',
                data: ''
            }
        ]
    };

    constructor(private fb: FormBuilder,
        private stateProvider: StateProvider,
        private modalService: SuiModalService,
        private _genericProfile: GenericProfile,
        private route: Router,
    ) {
        this.victimForm = this.fb.group({
            stateId: [''],
            lgaId: [''],
            cityId: ['', Validators.required],
            street: ['', Validators.required],
            incidentDate: ['', Validators.required],
            incidentType: ['', Validators.required],
            incidentDescription: ['', Validators.required],
            homeAddress: ['', Validators.required],

        });
        this.getStates();
        this.getVictimProfiles();
        // this._genericProfile.getProfile();

    }

    get user(): any {
        return this._genericProfile.user;
    }
    set user(value: any) {
        this._genericProfile.user = value;
    }


    // initial state type
    county: Country = {
        CountryCode: 'NG',
        CountryName: 'Nigeria',
    };

    // initial state type
    county2: Country = {
        CountryCode: 'NG',
        CountryName: 'Nigeria',
    };


    back(event) {
        if (event != null) {
            this.route.navigate(['/admin/dashboard']);
        }
    }

    onDisplayState(event: any) {
        if (event != null) {
            this.getLga(event);
        }
    }

    onDisplayLGA(event: any) {
        if (event != null) {
            this.getCity(event);
        }
    }
    onDisplayCity(event) {
        if (event != null) {
            this.fieldsCollapse = true;
        }
    }

    onDisplayTypeLife(event) {
        if (event !== '') {
            this.descriptionCollapse = !this.descriptionCollapse;
            return;
        }
    }
    onDisplayTypeOthers(event) {
        if (event !== '') {
            this.descriptionCollapse = !this.descriptionCollapse;
            return;
        }
    }

    getVictimProfiles() {
        this.error = null;
        this.pending = true;
        this.stateProvider.getProfiles().pipe(
            takeUntil(this.unsubscribe$))
            .subscribe((res: any) => {
                this.pending = false;
                this.victim = res.Data;
            },
                error => {
                    this.pending = false;
                    this.error = error.error;
                });
    }

    getStates() {
        this.error = null;
        this.pending = true;

        this.stateProvider.getState().pipe(
            takeUntil(this.unsubscribe$))
            .subscribe((res) => {
                this.pending = false;
                this.states = res.Data;
            },
                error => {
                    this.pending = false;
                    this.error = error.error;
                });
    }

    getLga(event: any) {
        this.error = null;
        this.pending = true;
        this.lgaCollapse = false;
        this.stateProvider.getLga({ stateId: event }).pipe(
            takeUntil(this.unsubscribe$))
            .subscribe((res) => {
                this.pending = false;
                this.lgas = res.Data;
                this.lgaCollapse = true;
            },
                error => {
                    this.pending = false;
                    this.lgaCollapse = false;
                    this.error = error.error;
                });
    }

    getCity(event) {
        this.error = null;
        this.pending = true;
        this.cityCollapse = false;
        this.stateProvider.getCity({ lgaId: event }).pipe(
            takeUntil(this.unsubscribe$))
            .subscribe((res: any) => {
                this.pending = false;
                this.cities = res.Data;
                this.cityCollapse = true;
            },
                error => {
                    this.pending = false;
                    this.cityCollapse = false;
                    this.error = error.error;
                });
    }

    successful() {
        const message = 'Please be patient with us as we validate your claim. We will get back to you.';
        this.modalService
            .open(new ConfirmModal('Profile updated!', message, ModalSize.Tiny))
            .onApprove(() => { this.redirect(); })
            .onDeny(() => { });
    }
    redirect() {
        this.route.navigate(['/admin/dashboard']);
    }

    submit() {
        this.error = null;
        this.pending = true;
        this.formSubmitAttempt = false;
        if (this.victimForm.valid) {
            this.stateProvider.submitVictimProfile({ body: this.victimForm.value }).pipe(
                takeUntil(this.unsubscribe$))
                .subscribe((res) => {
                    this.pending = false;
                    this.victimForm.reset();
                    this.successful();
                }, error => {
                    this.pending = false;
                    this.error = error.error;
                });
        } else {
            this.pending = false;
            this.formSubmitAttempt = true;
        }
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


    ngOnDestroy() {
        // unsubscribe all subsciptons
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
