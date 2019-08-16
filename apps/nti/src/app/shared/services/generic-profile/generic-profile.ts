import { Injectable } from '@angular/core'
import { Subject } from 'rxjs/Subject';
import { Router } from '@angular/router';
import { SharedService } from '../shared';
import { takeUntil } from 'rxjs/operators';

@Injectable()
export class GenericProfile {
    private $unsubscribe: Subject<any> = new Subject<any>();
    constructor(private route: Router,
        private userService: SharedService) {
        this.getProfile();
    }
    user: any;
    error: string | null;
    role: any;
    fullName: any

    getProfile() {
        this.userService.getProfile().pipe(
            takeUntil(this.$unsubscribe))
            .subscribe((res: any) => {
                this.user = res;
                this.fullName = res.LastName + "  " + res.FirstName;
                this.role = JSON.parse(localStorage.getItem('userRoles'))[0];
            },
                error => {
                    this.error = error;
                })
    }

}