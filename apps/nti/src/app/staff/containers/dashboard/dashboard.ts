import { Component, OnDestroy } from '@angular/core'
import { Subject } from 'rxjs/Subject';
import { takeUntil} from 'rxjs/operators';
import { UserModel } from '../../../users/models/user.model';
import { GenericProfile } from '../../../shared/services/generic-profile/generic-profile';

@Component({
    selector: 'nti-staff-dashboard',
    templateUrl: './dashboard.html',
    styleUrls: ['./dashboard.less'],
})

export class DashboardContainer implements OnDestroy {
    private unsubscribe$: Subject<void> = new Subject<void>();

    totalUnread: number = 0;
    unRead: any[];
    optionPopulated: boolean = false;
    
    //Get dashboard params
    pending: boolean
    success: boolean;
    error: string | null;
    
    constructor(private _genericProfile: GenericProfile) {
    }
    get user(): any {
        return this._genericProfile.user;
    }
    set user(value: any) {
        this._genericProfile.user = value;
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}

