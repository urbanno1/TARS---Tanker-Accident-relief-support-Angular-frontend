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

@Component({
    selector: 'app-nti-audit-trail',
    templateUrl: './audit-trail.html',
    styleUrls: ['../../admin.less'],
})

export class AuditTrailComponent implements OnDestroy {
    private unsubscribe$: Subject<void> = new Subject<void>();

    auditParams: AppFilter
    public search = new FormControl();

    //Used for Pagination.
    page = 1
    total = 0
    maxSize = 1
    pageSize = 1

    error: string | null
    message: string
    selected: boolean = true;
    pending: boolean = false
    audits: any[]

    searchFilter = {
        groupOp: "AND",
        rules: [
            {
                field: "AuditName",
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
        this.auditParams = new AppFilter({ sidx: "AuditCreatedDate", rows: 10 })
        this.getAuditTrail(1);

        this.search.valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged(),
        ).subscribe(
            searchText => {
                this.audit.firstName = searchText;
                this.searchFilter.rules[0].data = searchText;
                this.auditParams.filters = this.searchFilter;
                this.getAuditTrail(1)
            }
        )
    }

    audit: any = {
        firstName: ""
    }

    getAuditTrail(page) {
        this.error = null;
        this.pending = true
        this.searchFilter.rules[0].data = this.audit.firstName
        this.auditParams.page = page
        this.auditParams.filters = this.searchFilter
        this.stateProvider.getAuditTrail({ body: this.auditParams }).pipe(
            tap(res => {
                this.total = res.Records;
                this.page = page
                this.pageSize = this.auditParams.rows
            }),
            map(res => res.Data),
            takeUntil(this.unsubscribe$))
            .subscribe(res => {
                this.pending = false
                this.audits = res
            },
                error => {
                    this.pending = false
                    this.error = error.error.error
                })
    }



    onSelectedOption(event: any) {
        this.audit = this.audits.filter(c => c.firstName == event)[0];
        this.getAuditTrail(this.page)
    }


    onDisplayRecords(event) {
        this.auditParams.rows = event
        this.getAuditTrail(1)
    }

    nextPage(event) {
        this.getAuditTrail(event)
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

