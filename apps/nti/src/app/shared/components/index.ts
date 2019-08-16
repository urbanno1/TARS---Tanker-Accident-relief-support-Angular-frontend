
import {SideBarShared} from './side-bar/side-bar'
import {AdminSideBarShared} from './admin-sidebar/admin-sidebar'
import {FooterShared} from './footer/footer'
import {FieldErrorDisplayComponent} from './error-handling/form-field-error'
import { NoRecordFound } from './error-handling/record-not-found';
import { ProgressComponent } from './dashboard/progress-bar';

export function components()
{
    return [
        SideBarShared,
        AdminSideBarShared,
        FooterShared,
        FieldErrorDisplayComponent,
        NoRecordFound,
        ProgressComponent,
    ]
}