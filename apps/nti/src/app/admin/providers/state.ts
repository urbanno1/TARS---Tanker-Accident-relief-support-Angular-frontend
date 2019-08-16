import { Injectable } from '@angular/core';
import { SharedService } from '../../shared/services/shared';
import { HttpClient, HttpParams} from '@angular/common/http';
import { GetResponse } from '../models/getResponse';

@Injectable()
export class StateProvider {
    baseUrl;
    headerRequest;
    constructor(private baseService: SharedService,
    private _http: HttpClient) {
        this.baseUrl = this.baseService.baseUrl;

    }

    getLoadedPhoto() {
        return this._http.get<GetResponse>(this.baseUrl + '/Victim/GetVictimPhoto/');
    }
    getPhoto() {
        return this._http.get<GetResponse>(this.baseUrl + '/Victim/LoadVictimPhoto/');
    }
    getProfiles() {
        return this._http.get<GetResponse>(this.baseUrl + '/Victim/LoadVictimProfile');
    }
    getState() {
        return this._http.get<GetResponse>(this.baseUrl + '/Victim/getStates');
    }

    getLga(params)  {
        return this._http.get<GetResponse>(this.baseUrl + '/Victim/GetLga/' + `${params.stateId}`);
    }

    getCity(params) {
        return this._http.get<GetResponse>(this.baseUrl + '/Victim/GetCity/' + `${params.lgaId}`);
    }
    submitVictimProfile(payload) {
        return this._http.post(this.baseUrl + '/Victim/AddVictimProfile', payload.body);
    }

    getStates(payload)  {
        return this._http.post<GetResponse>(this.baseUrl + '/admin/getStates', payload.body);
    }

    getCountry(payload) {
        return this._http.post<GetResponse>(this.baseUrl + '/admin/getCountries', payload.body);
    }

    uploadImage(payload) {
        return this._http.post(this.baseUrl + '/Victim/UploadImage', payload.body);
    }

    getDashboardProfiles(payload) {
        return this._http.post<GetResponse>(this.baseUrl + '/admin/GetVictimProfiles',  payload.body);
    }

    getDashboardPhotos(params) {
        return this._http.get<GetResponse>(this.baseUrl + '/admin/GetVictimPhotos/'+ `${params.victimId}`);
    }
    getDonorProfiles(payload) {
        return this._http.post<GetResponse>(this.baseUrl + '/admin/GetDonors',  payload.body);
    }

    getVictimProfile(params) {
        return this._http.get<GetResponse>(this.baseUrl + '/admin/VictimProfile/'+ `${params.victimId}`);
    }

    AdminAddProfile(payload) {
        return this._http.post(this.baseUrl + '/Admin/AddVictimProfile', payload.body);
    }

    DeleteAdminPhotos(params) {
        return this._http.get<GetResponse>(this.baseUrl + '/admin/DeleteImage/'+ `${params.victimId}/${params.photoTitle}`);
    }

    getAuditTrail(payload) {
        return this._http.post<GetResponse>(this.baseUrl + '/admin/GetAuditTrail',  payload.body);
    }
}
