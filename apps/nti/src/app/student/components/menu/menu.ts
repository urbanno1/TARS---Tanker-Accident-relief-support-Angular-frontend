import { Component, OnDestroy } from '@angular/core'
import { Router } from "@angular/router";
import { Subject } from 'rxjs/Subject';
import { UserModel } from '../../../users/models/user.model';
import { GenericProfile } from '../../../shared/services/generic-profile/generic-profile';

@Component({
    selector: 'nti-student-menu',
    templateUrl: './menu.html',
    styleUrls: ['./menu.less'],
})

export class MenuContainer implements OnDestroy {
    private unsubscribe$: Subject<void> = new Subject<void>();

    totalUnread: number = 0;
    unRead: any[];
    optionPopulated: boolean = false
    //Get dashboard params
    pending: boolean
    success: boolean;
    error: string | null;
    user: UserModel

    constructor(private router: Router, private _genericProfile: GenericProfile) {
    }

    get fullName(): string {
        return this._genericProfile.fullName;
    }
    set fullName(value: string) {
        this._genericProfile.fullName = value;
    }

    get role(): string {
        return this._genericProfile.role;
    }
    set role(value: string) {
        this._genericProfile.role = value;
    }

    ngOnDestroy() {
    }

    show() { }
    logout() {
        localStorage.removeItem('userToken');
        this.router.navigate(["/home"])
    }

}