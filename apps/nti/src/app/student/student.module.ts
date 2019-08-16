import {NgModule} from '@angular/core'
import {components} from './components'
import {containers} from './containers'
import {providers} from './providers'
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../shared/services/auth/auth-interceptor';
import { StudentContainer } from './student';
import { SharedModule } from '../shared/shared.module';
import { StudentRoutingModule } from './student.routing.module';

@NgModule({
    imports: [
      StudentRoutingModule,
      SharedModule,
      ],
      declarations: [
        components(),
        containers(),
        StudentContainer,
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

export class StudentModule{}