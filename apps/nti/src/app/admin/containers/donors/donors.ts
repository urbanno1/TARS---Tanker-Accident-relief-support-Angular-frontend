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
import { Donors } from '../../models/donors';

@Component({
    selector: 'app-nti-donors',
    templateUrl: './donors.html',
    styleUrls: ['../../admin.less'],
})

export class DonorsComponent implements OnDestroy {
    private unsubscribe$: Subject<void> = new Subject<void>();

    donoParams: AppFilter
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
    donors: Donors[]

    searchFilter = {
        groupOp: "AND",
        rules: [
            {
                field: "FullName",
                op: "cn",
                data: ""
            },
        ]
    }

    generalProfileStatusPercentage: any = 60;
    generalPhotoStatusPercentage: any = 40;

    constructor(
        private stateProvider: StateProvider,
        public roleService: SharedService,
        private route: Router,
    ) {
        this.donoParams = new AppFilter({ sidx: "CreatedDate", rows: 10 })
        this.getDonors(this.page);

        this.search.valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged(),
        ).subscribe(
            searchText => {
                this.donor.FullName = searchText;
                this.searchFilter.rules[0].data = searchText;
                this.donoParams.filters = this.searchFilter;
                this.getDonors(1)
            }
        )
    }

    donor: Donors = {
        FullName: ""
    }

    getDonors(page) {
        this.error = null;
        this.pending = true
        this.searchFilter.rules[0].data = this.donor.FullName
        this.donoParams.page = page
        this.donoParams.filters = this.searchFilter
        this.stateProvider.getDonorProfiles({ body: this.donoParams }).pipe(
            tap(res => {
                this.total = res.Records;
                this.page = page
                this.pageSize = this.donoParams.rows
            }),
            map(res => res.Data),
            takeUntil(this.unsubscribe$))
            .subscribe(res => {
                this.pending = false
                this.donors = res
            },
                error => {
                    this.pending = false
                    this.error = error.error.error
                })
    }



    onSelectedOption(event: any) {
        this.donor = this.donors.filter(c => c.FullName == event)[0];
        this.getDonors(this.page)
    }


    onDisplayRecords(event) {
        this.donoParams.rows = event
        this.getDonors(1)
    }

    nextPage(event) {
        this.getDonors(event)
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

