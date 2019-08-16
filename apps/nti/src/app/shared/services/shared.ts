import { Injectable } from '@angular/core'
import { environment } from '../../../environments/environment.prod'
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { GetResponse } from '../../admin/models/getResponse';

@Injectable()

export class SharedService {
    role: any[];
    private refreshStorage: Subject<any> = new Subject<any>();
    constructor(private route: Router, private _http: HttpClient,
    ) { }


    setRefreshStorage(chart): void {
        this.refreshStorage.next(chart)
    }
    getRefreshStorage(): Observable<any> {
        return this.refreshStorage.asObservable();
    }

    getProfile() {
        return this._http.get(this.baseUrl + '/user/GetUserClaims')
    }

    get baseUrl() {
        return environment.API_BASE_URL;
    }

    noAuthHeaders() {
        let headerRequest = new HttpHeaders({ 'No-Auth': 'True' })
        return headerRequest;
    }

    headersContentType() {
        let headerContent = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' })
        return headerContent;
    }

    roleMatch(allowedUserRoles) {
        var isMatch = false;
        var userRoles: string[] = JSON.parse(localStorage.getItem('userRoles'))
        allowedUserRoles.forEach(element => {
            if (userRoles.indexOf(element) > -1) {
                isMatch = true
                return false;
            }
        });
        return isMatch;
    }

    getDonorProfiles(payload) {
        return this._http.post<GetResponse>(this.baseUrl + '/admin/DisplayDonors',  payload.body, {headers: this.noAuthHeaders()});
    }

    navigateMatch(roles) {
        if (this.roleMatch(roles)) {
            roles.forEach(element => {
                switch (element) {
                    case 'Admin':
                        this.route.navigateByUrl('/admin');
                        break;

                    case 'Victim':
                        this.route.navigateByUrl('/admin');
                        break;

                    case 'Staff':
                        this.route.navigateByUrl('/staff');
                        break;

                }
            });
        }
    }

}