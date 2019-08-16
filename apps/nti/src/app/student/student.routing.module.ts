import { RouterModule } from '@angular/router'
import { ModuleWithProviders } from '@angular/core';
import { AuthGuard } from '../shared/services/auth/auth.guard';
import { ForbiddenContainer } from '../shared/components/forbidden/forbidden';
import { DashboardContainer } from './containers/dashboard/dashboard';
import { StudentContainer } from './student';

export const routes = [

    {
        path: '', component: StudentContainer, canActivate: [AuthGuard], data: { roles: ['Student'] },
        children: [
            { path: 'dashboard', component: DashboardContainer, data: { breadcrumb: 'Dashboard' } },
            { path: '', redirectTo: 'dashboard', },

            // {
            //     path: 'organization', component: Organization, data: { breadcrumb: 'Organization' },
            //     children: [
            //         { path: '', redirectTo: 'list', pathMatch: 'full' },
            //         { path: 'list', component: OrganizationListContainer, data: { breadcrumb: 'List' } },
            //         { path: 'collaborator/:id', component: CollaboratorContainer, data: { breadcrumb: 'Collaborator' } },
            //         { path: 'contractor/:id', component: Contractor, data: { breadcrumb: 'Contractor' } },
            //         { path: 'users/:id', component: Users, data: { breadcrumb: 'Users' } },
            //     ]
            // },
        ],
    },
    { path: 'forbidden', component: ForbiddenContainer, canActivate: [AuthGuard] },

]

export const StudentRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
