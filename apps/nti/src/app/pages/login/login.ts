import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms'
import { Router } from '@angular/router';
//import { SharedValidators } from '../../shared/components/validators/common'
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs/Subject';
import { LoginProvider } from '../provider/login';
import { userLogin } from '../models/login.models';
import { GenericProfile } from '../../shared/services/generic-profile/generic-profile';
import { SharedService } from '../../shared/services/shared';

interface ValidationResult {
    [key: string]: boolean;
}
@Component({
    selector: 'app-nti-login',
    templateUrl: './login.html',
    styleUrls: ['./login.less'],
})


export class LoginComponent implements OnDestroy {
    private unsubscribe$: Subject<void> = new Subject<void>();

    loadingScroll = false;
    loginForm: FormGroup;
    formSubmitAttempt: boolean;

    login: userLogin;
    // Add Registering details
    success: boolean;
    error: string | null;
    pending: boolean;

    constructor(private fb: FormBuilder,
        private route: Router,
        private _register: LoginProvider,
        private userService: SharedService, private _genericProfile: GenericProfile) {

        this.loginForm = this.fb.group({
            username: ['', Validators.required ],
            password: ['', [Validators.required, this.strongPassword]],
        })

    }

     strongPassword(control:FormControl):ValidationResult {
        // const re = /^.{6,}$/
        const re = /^.{6,}$/
             if (control.value !== '' && re.test(control.value)) {
             return null;
         }
         return { 'strongPassword': true };
     }

    isFieldValid(field: string) {
        return (
            (!this.loginForm.get(field).valid &&
                this.loginForm.get(field).touched) ||
            (!this.loginForm.get(field).valid && this.formSubmitAttempt)
        );
    }

    displayFieldCss(field: string) {
        return {
            error: this.isFieldValid(field)
        };
    }



    submit() {
        this.success = false;
        this.error = null;
        this.pending = true;
        if (this.loginForm.valid) {
            this._register.userAunthentication({ body: this.loginForm.value }).pipe(
                takeUntil(this.unsubscribe$))
                .subscribe((res: any) => {
                    localStorage.setItem('userToken', res.access_token);
                    localStorage.setItem('userRoles', res.role);
                    this.userService.navigateMatch(JSON.parse(localStorage.getItem('userRoles')));
                    this.pending = false;
                    this.success = true;
                    this.loginForm.reset();
                    this._genericProfile.getProfile();
                },
                    error => {
                        this.pending = false;
                        this.error = error.error.error_description;
                    });
        } else {
            this.pending = false;
            this.formSubmitAttempt = true;
        }

    }

    registerNow() {
    }

    register() {
        this.loadingScroll = true;
        this.route.navigate(['/users'])
    }

    ngOnDestroy() {

    }
}