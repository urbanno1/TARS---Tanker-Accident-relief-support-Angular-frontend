import { Injectable } from '@angular/core'
import { SharedService } from '../../shared/services/shared'
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable()
export class RegisterProvider {
    baseUrl: string;
    headerReq;
    constructor(public baseService: SharedService,
        public _http: HttpClient) {
        this.baseUrl = baseService.baseUrl;
        this.headerReq = baseService.noAuthHeaders;
    }

    addRegister(payload) {
        return this._http.post(this.baseUrl + '/user/register/', payload.body, {headers:new this.headerReq});
    }

    registerVictims(payload)
    {
        return this._http.post(this.baseUrl + '/Victim/RegisterVictim/', payload.body, {headers:new this.headerReq});
    }

    registerDonor(payload)
    {
        return this._http.post(this.baseUrl + '/Victim/RegisterDonor/', payload.body, {headers:new this.headerReq});
    }


    UploadImage(payload)
    {
        return this._http.post(this.baseUrl + '/Victim/UploadVictim/', payload.body, {headers:new this.headerReq});
    }
}