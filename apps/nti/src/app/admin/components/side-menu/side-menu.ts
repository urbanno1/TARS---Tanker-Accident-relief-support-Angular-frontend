import {Component, OnDestroy} from '@angular/core'
import { SharedService } from '../../../shared/services/shared';

@Component({
    selector: 'nti-admin-side-menu',
    templateUrl: './side-menu.html',
    styleUrls: ['./side-menu.less'],
})

export class SideMenuContainer implements OnDestroy
{
    constructor(public roleService: SharedService){}

    ngOnDestroy() {
    }
}