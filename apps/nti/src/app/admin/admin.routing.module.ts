import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AdminContainer } from './admin';
import { DashboardContainerComponent } from './containers/dashboard/dashboard';
import { AuthGuard } from '../shared/services/auth/auth.guard';
import { ForbiddenContainer } from '../shared/components/forbidden/forbidden';
import { StateContainer } from './containers/state/state';
import { CountryContainer } from './containers/country/country';
import { VictimProfileComponent } from './containers/victim-profile/victim-profile';
import { VictimPhotoComponent } from './containers/victim-photo/victim-photo';
import { DashboardVictimProfileComponent } from './components/dashboard-victims/dashboard-victim-profile';
import { DashboardVictimDocumentComponent } from './components/dashboard-victim-photos/dashboard-victim-photos';
import { DonorsComponent } from './containers/donors/donors';
import { AdminEditVictimComponent } from './components/admin-edit-victim/admin-edit-victim';
import { AuditTrailComponent } from './containers/audit-trail/audit-trail';

export const routes = [

    {
        path: '', component: AdminContainer, canActivate: [AuthGuard], data: { roles: ['Admin', 'Victim'] },
        children: [
            { path: 'dashboard', component: DashboardContainerComponent, data: { breadcrumb: 'Dashboard' } },
            { path: '', redirectTo: 'dashboard', },
            { path: 'state', component: StateContainer, data: { breadcrumb: 'State' } },
            { path: 'country', component: CountryContainer, data: { breadcrumb: 'Country' } },
            { path: 'victim-profile', component: VictimProfileComponent, data: { breadcrumb: 'Victim Profile' } },
            { path: 'victim-photo', component: VictimPhotoComponent, data: { breadcrumb: 'Victim Photo' } },
            { path: 'dashboard-victim-profile', component: DashboardVictimProfileComponent, data: { breadcrumb: 'Victim Profiles' } },
            { path: 'dashboard-victim-photos/:id/:firstName/:lastName/:phoneNumber', component: DashboardVictimDocumentComponent, data: { breadcrumb: 'Victim Photo' } },
            { path: 'donors', component: DonorsComponent, data: { breadcrumb: 'Donors' } },
            { path: 'admin-edit-victim/:id/:firstName/:lastName/:phoneNumber', component: AdminEditVictimComponent, data: { breadcrumb: 'Admin Edit Victim' } },
            { path: 'audit-trail', component: AuditTrailComponent, data: { breadcrumb: 'Audit Trail' } },
            
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

];

export const AdminRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
