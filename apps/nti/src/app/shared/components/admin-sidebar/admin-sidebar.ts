import {Component, OnDestroy} from '@angular/core'

@Component({
selector: 'nti-admin-sidebar-shared',
template: `
              <a class="item" routerLinkActive="active" [routerLink]="['']">Home</a>
              <a class="item" routerLinkActive="active" >Victim Profile</a>
              <a class="item" routerLinkActive="active" >Donors</a>
`,

})

export class AdminSideBarShared implements OnDestroy {

    ngOnDestroy()
    {
    }
}