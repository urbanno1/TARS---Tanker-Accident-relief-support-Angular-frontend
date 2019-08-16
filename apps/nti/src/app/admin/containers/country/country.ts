import { Component, OnDestroy } from "@angular/core"
import { Subject } from "rxjs/Subject";
import { AppFilter } from "../../models/filters/filter";
import { StateProvider } from "../../providers/state";
import { takeUntil, map } from "rxjs/operators";
import { Country } from "../../models/country";

@Component({
    selector: 'nti-admin-country',
    templateUrl: './country.html',
    styleUrls: ['../../admin.less']
})

export class CountryContainer implements OnDestroy {
    private unsubscribe$: Subject<void> = new Subject<void>();


    ngOnDestroy() {
        // unsubscribe all subsciptons
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}