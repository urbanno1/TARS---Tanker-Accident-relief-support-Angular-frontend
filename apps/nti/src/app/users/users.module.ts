import {NgModule} from '@angular/core'
import {components} from './components'
import {containers} from './containers'
import {providers} from './providers'
import {UsersRoutingModule} from './users.routing.module'
import {UsersContainer} from './users'
import {SharedModule} from '../shared/shared.module'

@NgModule({
    imports: [
      UsersRoutingModule,
      SharedModule,
      ],
      declarations: [
        components(),
        containers(),
        UsersContainer,
      ],
      exports: [
      ],
      providers: [providers()],
})

export class UsersModule{}