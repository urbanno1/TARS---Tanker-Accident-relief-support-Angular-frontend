import {DashboardContainerComponent} from './dashboard/dashboard';
import { StateContainer } from './state/state';
import { CountryContainer } from './country/country';
import { VictimProfileComponent } from './victim-profile/victim-profile';
import { VictimPhotoComponent } from './victim-photo/victim-photo';
import { DonorsComponent } from './donors/donors';
import { AuditTrailComponent } from './audit-trail/audit-trail';


export function containers() {
    return [
        DashboardContainerComponent,
        StateContainer,
        CountryContainer,
        VictimProfileComponent,
        VictimPhotoComponent,
        DonorsComponent,AuditTrailComponent
    ];
}
