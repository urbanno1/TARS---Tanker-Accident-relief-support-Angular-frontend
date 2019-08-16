import { Component, OnDestroy } from "@angular/core"
import { Subject } from "rxjs/Subject";
import { AppFilter } from "../../models/filters/filter";
import { StateProvider } from "../../providers/state";
import { takeUntil, map, tap, debounceTime, distinctUntilChanged } from "rxjs/operators";
import { Country } from "../../models/country";
import { State } from "../../models/state";
import { FormControl } from "@angular/forms";
import { ConfirmModal } from "../../../shared/container/modals/admin-model";
import {SuiModalService, ModalSize} from "ng2-semantic-ui"


@Component({
    selector: 'nti-admin-state',
    templateUrl: './state.html',
    styleUrls: ['../../admin.less']
})

export class StateContainer implements OnDestroy {
    private unsubscribe$: Subject<void> = new Subject<void>();
    stateParams: AppFilter
    countryParams: AppFilter
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
    countries: Country[]
    states: State[]

    searchFilter = {
        groupOp: "AND",
        rules: [
            {
                field: "Country.CountryCode",
                op: "eq",
                data: ""
            },
            {
                field: "state_name",
                op: "cn",
                data: ""
            }
        ]
    }

    constructor(private stateProvider: StateProvider,
    private modalService: SuiModalService) {
        this.stateParams = new AppFilter({ sidx: "state_Name", rows: 10 })
        this.countryParams = new AppFilter({ sidx: "created_Date", rows: 10 })
        this.getCountry()
        this.getStates(this.page)

        this.search.valueChanges.pipe(
            debounceTime(500),
            distinctUntilChanged(),
        ).subscribe(
            searchText => {
                this.county.CountryName = searchText;
                this.searchFilter.rules[1].data = searchText;
                this.stateParams.filters = this.searchFilter;
                this.getStates(this.page)
            }
        )
    }

    //initial state type
    county: Country = {
        CountryCode: "NG",
        CountryName: "Nigeria",
    };

    //initial state type
    county2: Country = {
        CountryCode: "NG",
        CountryName: "Nigeria",
    };


    getCountry() {
        this.countryParams.page = this.page
        this.stateProvider.getCountry({ body: this.countryParams }).pipe(
            map(res => res.Data),
            takeUntil(this.unsubscribe$))
            .subscribe(res => {
                this.countries = res
            },
                error => {
                    this.error = error.error.error
                })
    }


    getStates(page) {
        this.error = null;
        this.pending = true
        this.searchFilter.rules[0].data = this.county.CountryCode
        this.stateParams.page = page
        this.stateParams.filters = this.searchFilter
        this.stateProvider.getStates({ body: this.stateParams }).pipe(
            tap(res => {
                this.total = res.Records;
                this.page = page
                this.pageSize = this.stateParams.rows
            }),
            map(res => res.Data),
            takeUntil(this.unsubscribe$))
            .subscribe(res => {
                this.pending = false
                this.states = res
                console.log(this.states)
            },
                error => {
                    this.pending = false
                    this.error = error.error.error
                })
    }

   
    onSelectedOption(event: any) {
        this.county2 = this.countries.filter(c => c.CountryCode == event)[0];
        this.county.CountryCode = this.county2.CountryCode;
        this.county.CountryName = this.county2.CountryName;
        this.getStates(this.page)
    }


    onDisplayRecords(event) {
        this.stateParams.rows = event
        this.getStates(1)
    }

    nextPage(event) {
        this.getStates(event)
    }

    createState() {

    }

    editOption() {

    }

    deleteOption() {
        this.modalService
        .open(new ConfirmModal("Are you sure?", "Are you sure about accepting this?", ModalSize.Tiny))
        .onApprove(() => {})
        .onDeny(() => {this.modalService.open});
    }


    ngOnDestroy() {
        // unsubscribe all subsciptons
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}