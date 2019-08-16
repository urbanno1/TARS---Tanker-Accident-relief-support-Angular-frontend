import {Component, OnDestroy} from '@angular/core'

@Component({
    selector: 'nti-forbidden',
    templateUrl: 'forbidden.html',
    styleUrls: ['./forbidden.less']
})

export class ForbiddenContainer implements OnDestroy
{
    constructor(){}

    ngOnDestroy() {
    }
}