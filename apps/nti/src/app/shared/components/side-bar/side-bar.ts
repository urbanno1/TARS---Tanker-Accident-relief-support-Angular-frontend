import {Component, OnDestroy} from '@angular/core'

@Component({
selector: 'nti-side-bar-shared',
template: `
              <a class="item" routerLinkActive="active" [routerLink]="['']">Home</a>
              <a class="item" routerLinkActive="active" [routerLink]="['../login']">Login</a>
              <a class="item" routerLinkActive="active" [routerLink]="['../home']">Register</a>
              <a class="item" routerLinkActive="active" [routerLink]="['../donate-money']">Donate Money</a>
              
`,

})

export class SideBarShared implements OnDestroy {

    ngOnDestroy()
    {
    }
}