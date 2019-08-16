import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { takeUntil, tap, map } from 'rxjs/operators';
import { AppFilter } from '../../../admin/models/filters/filter';
import { SharedService } from '../shared';

@Injectable()
export class GenericDonor {
    private unsubscribe$: Subject<any> = new Subject<any>();
    donoParams: AppFilter
    //Used for Pagination.
    error: string | null
    loadingScroll: boolean = false
    donors: any[]
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
    constructor(
        private route: Router,
        private userService: SharedService ) {
        this.donoParams = new AppFilter({ sidx: "CreatedDate", rows: 4 })
    }

    donor: any = {
        FullName: ""
    }

    getDonors(page) {
        this.error = null;
        this.loadingScroll = true
        this.searchFilter.rules[0].data = this.donor.FullName
        this.donoParams.page = page
        this.donoParams.filters = this.searchFilter
        this.userService.getDonorProfiles({ body: this.donoParams }).pipe(
            takeUntil(this.unsubscribe$))
            .subscribe((res: any) => {
                this.loadingScroll = false
                this.donors = res.Data
            },
                error => {
                    this.loadingScroll = false
                    // this.error = error.error.error
                })
    }


}