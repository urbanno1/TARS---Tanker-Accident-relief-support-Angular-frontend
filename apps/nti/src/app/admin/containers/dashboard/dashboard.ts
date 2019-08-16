import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { GenericProfile } from '../../../shared/services/generic-profile/generic-profile';
import { SharedService } from '../../../shared/services/shared';
import { Router } from '@angular/router';

@Component({
    selector: 'app-nti-admin-dashboard',
    templateUrl: './dashboard.html',
    styleUrls: ['../../admin.less'],
})

export class DashboardContainerComponent implements OnDestroy {
    private unsubscribe$: Subject<void> = new Subject<void>();
    totalUnread = 0;
    unRead: any[];
    // Get dashboard params
    pending: boolean;
    success: boolean;
    error: string | null;
    generalProfileStatusPercentage: any = 60;
    generalPhotoStatusPercentage: any = 40;
    constructor(private _genericProfile: GenericProfile,
        public roleService: SharedService,
        private route: Router) {
            this._genericProfile.getProfile();
    }

    get user(): any {
        return this._genericProfile.user;
    }
    set user(value: any) {
        this._genericProfile.user = value;
    }

    updateProfile() {
        this.route.navigate(['/admin/victim-profile']);
    }
    updatePhoto() {
        this.route.navigate(['/admin/victim-photo']);
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}

