import {NgModule} from '@angular/core'
import {components} from './components'
import {containers} from './containers'
import {providers} from './providers'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../shared/services/auth/auth-interceptor';
import { StaffContainer } from './staff';
import { StaffRoutingModule } from './staff.routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
      StaffRoutingModule,
      SharedModule,
      ],
      declarations: [
        components(),
        containers(),
        StaffContainer,
      ],
      exports: [
      ],
      providers: [providers(),
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true
      }],
})

export class StaffModule{}