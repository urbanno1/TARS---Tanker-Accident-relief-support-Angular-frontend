import {Component, OnDestroy} from '@angular/core'

@Component({
selector: 'nti-footer-shared',
template: `
<div id="footer" class="ui vertical basic segment">
<div class="ui stackable grid container">
    <div id="menu" class="ten wide column computer only">
        <div class="ui text menu footer" style="font-size: 12px!important;">
            <div class="header item" style="font-size: xx-large;">
                TARS
            </div>
            <a class="item" routerLinkActive="active">News & Media</a>
            <a class="item" routerLinkActive="active">Contact Us</a>
            <a class="item" routerLinkActive="active">About Us</a>
        </div>
    </div>
    <div id="copyright" style="font-size: 12px!important;" class="right floated middle aligned four wide column computer only">
        @ Tanker accident relief support.
    </div>
</div>
</div>
`,

})

export class FooterShared implements OnDestroy {

    ngOnDestroy()
    {
    }
}