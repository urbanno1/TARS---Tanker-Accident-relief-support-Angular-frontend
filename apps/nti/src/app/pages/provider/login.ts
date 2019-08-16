import { Injectable } from '@angular/core'
import { SharedService } from '../../shared/services/shared'
import { HttpClient } from "@angular/common/http";


@Injectable()
export class LoginProvider {
    baseUrl: string;
    headerReq
    constructor(public baseService: SharedService,
        public _http: HttpClient) {
        this.baseUrl = this.baseService.baseUrl;
        this.headerReq = this.baseService.headersContentType
    }

   
    userAunthentication(payload) {
        var username = payload.body.username;
        var password = payload.body.password;
        var data = "username=" + username + "&password=" + password + "&grant_type=password"
        return this._http.post(this.baseUrl + '/token', data, { headers: new this.headerReq });
    }
}