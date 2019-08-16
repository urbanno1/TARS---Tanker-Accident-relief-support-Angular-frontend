import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/do';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private route: Router){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
    {
        if(req.headers.get('No-Auth') == "True")
        return next.handle(req.clone());

        if(localStorage.getItem('userToken') != null)
        {
            const clonedRequest = req.clone({
                headers: req.headers.set("Authorization", "Bearer "+localStorage.getItem('userToken'))
            });

            return next.handle(clonedRequest)
            .do(
                succ =>{},
                err=>{
                    if(err.status == 401)
                    this.route.navigateByUrl('/home');
                    if(err.status == 403)
                    this.route.navigateByUrl('/forbidden');

                });
        }
        else
       {
        this.route.navigateByUrl('/home');
       }
    }
}