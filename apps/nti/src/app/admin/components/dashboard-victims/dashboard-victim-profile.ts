import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { GenericProfile } from '../../../shared/services/generic-profile/generic-profile';
import { SharedService } from '../../../shared/services/shared';
import { Router } from '@angular/router';
import { AppFilter } from '../../models/filters/filter';
import { FormControl } from '@angular/forms';
import { StateProvider } from '../../providers/state';
import { SuiModalService } from 'ng2-semantic-ui';
import { tap, map, takeUntil, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Victim } from '../../models/Victim';

@Component({
    selector: 'app-nti-dashboard-victim-profile',
    templateUrl: './dashboard-victim-profile.html',
    styleUrls: ['../../admin.less'],
})

export class DashboardVictimProfileComponent implements OnDestroy {
    private unsubscribe$: Subject<void> = new Subject<void>();

    victimParams: AppFilter
    public search = new FormControl();

    //Used for Pagination.
    page = 1
    total = 0
    maxSize = 5
    pageSize = 1

    error: string | null
    message: string
    selected: boolean = true;
    pending: boolean = false
    victims: Victim[]

    searchFilter = {
        groupOp: "AND",
        rules: [
            {
                field: "LastName",
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
    ) {
        this.victimParams = new AppFilter({ sidx: "RegisteredDate", rows: 10 })

        this.getVictimProfiles(1);

        this.search.valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged(),
        ).subscribe(
            searchText => {
                this.victim.firstName = searchText;
                this.searchFilter.rules[0].data = searchText;
                this.victimParams.filters = this.searchFilter;
                this.getVictimProfiles(1)
            }
        )
    }

    victim: Victim = {
        firstName: ""
    }

    getVictimProfiles(page) {
        this.error = null;
        this.pending = true
        this.searchFilter.rules[0].data = this.victim.firstName
        this.victimParams.page = page
        this.victimParams.filters = this.searchFilter
        this.stateProvider.getDashboardProfiles({ body: this.victimParams }).pipe(
            tap(res => {
                this.total = res.Records;
                this.page = page
                this.pageSize = this.victimParams.rows
            }),
            map(res => res.Data),
            takeUntil(this.unsubscribe$))
            .subscribe(res => {
                this.pending = false
                this.victims = res
            },
                error => {
                    this.pending = false
                    this.error = error.error.error
                })
    }



    onSelectedOption(event: any) {
        this.victim = this.victims.filter(c => c.firstName == event)[0];
        this.getVictimProfiles(this.page)
    }


    onDisplayRecords(event) {
        this.victimParams.rows = event
        this.getVictimProfiles(1)
    }

    nextPage(event) {
        this.getVictimProfiles(event)
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

