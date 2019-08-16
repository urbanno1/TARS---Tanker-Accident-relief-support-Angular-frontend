import { Injectable } from "@angular/core";
import { SharedService } from "../../shared/services/shared";
import { HttpClient} from "@angular/common/http";

@Injectable()
export class DashboardProvider {
    baseUrl;
    headerRequest;
    constructor(private baseService: SharedService,
    private _http:HttpClient) {
        this.baseUrl = this.baseService.baseUrl;
    }

    getDashboard()
    {
        return this._http.get(this.baseUrl+'/user/GetUserClaims')
    }
}