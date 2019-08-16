import { NgModule } from '@angular/core'
import { SuiModule } from 'ng2-semantic-ui'
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";

import { services } from "./services";
import { components } from "./components"
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './services/auth/auth-interceptor';
import { ForbiddenContainer } from './components/forbidden/forbidden';
import { container } from './container';
import { ConfirmModalComponent } from './container/modals/admin-model';
import { ConfirmModalDonorComponent } from './container/modals/donor-popUp';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        SuiModule,
        HttpClientModule,
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        SuiModule,
        HttpClientModule,
        components(),
        container(),
        ForbiddenContainer
    ],
    declarations: [
        components(),
        container(),
        ForbiddenContainer,
    ],
    entryComponents: [
        ConfirmModalComponent,
        ConfirmModalDonorComponent,
    ],
})

export class SharedModule {
    static forRoot() {
        return {
            ngModule: SharedModule,
            providers: [...services(),
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: AuthInterceptor,
                    multi: true
                }
            ]
        }
    }
}