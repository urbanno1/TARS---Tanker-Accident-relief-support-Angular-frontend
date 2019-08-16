import {NgModule} from '@angular/core'
import {components} from './components'
import {containers} from './containers'
import {providers} from './providers'
import {AdminRoutingModule} from './admin.routing.module'
import {AdminContainer} from './admin'
import {SharedModule} from '../shared/shared.module'
import { AuthInterceptor } from '../shared/services/auth/auth-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {TimeAgoPipe} from 'time-ago-pipe';

@NgModule({
    imports: [
      AdminRoutingModule,
      SharedModule,
      ],
      declarations: [
        components(),
        containers(),
      TimeAgoPipe,
      AdminContainer,
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

export class AdminModule{}