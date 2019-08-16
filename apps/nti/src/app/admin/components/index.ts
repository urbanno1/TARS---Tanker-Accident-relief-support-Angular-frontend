import {MenuContainer} from './menu/menu'
import {SideMenuContainer} from './side-menu/side-menu'
import { DashboardVictimProfileComponent } from './dashboard-victims/dashboard-victim-profile';
import { DashboardVictimDocumentComponent } from './dashboard-victim-photos/dashboard-victim-photos';
import { AdminEditVictimComponent } from './admin-edit-victim/admin-edit-victim';
export function components()
{
    return [
        MenuContainer,
        SideMenuContainer,
        DashboardVictimProfileComponent,
        DashboardVictimDocumentComponent,
        AdminEditVictimComponent,
    ]
}