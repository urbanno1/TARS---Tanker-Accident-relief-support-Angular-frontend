import { RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core';
import {UsersContainer} from './users'
import {RegisterContainer} from './containers/register/register'

export const routes = [
    {
         path: '', component: UsersContainer,
        children: [
            { path: 'register', component: RegisterContainer, data: { breadcrumb: 'Register' } },
            { path: '', redirectTo: 'register', },
        ],
    }
]

export const UsersRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
