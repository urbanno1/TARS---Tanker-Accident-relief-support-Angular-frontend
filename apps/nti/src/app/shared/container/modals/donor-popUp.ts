import { Component } from '@angular/core';
import { SuiModal, ComponentModalConfig, ModalSize } from 'ng2-semantic-ui';

interface IConfirmModalContext {
    title: string;
}

@Component({
    selector: 'app-modal-confirm',
    template: `
<div class="header" style="text-align:center;color:green">{{ modal.context.title }}</div>
<div class="content">
<h4>1. First, you need to transfer to either of the banks detailed below <span style="font-size: 12px;">
(The transaction ID generated is required)
</span>;
</h4>
<ul>
<li><span style="font-weight: bolder;">GTBank:</span> <span style="color:green">0034567677.</span></li>
<li><span style="font-weight: bolder;">First Bank:</span> <span style="color:green">0115674883.</span></li>
</ul>
<h4 style="margin-bottom:0px">2. Enter Transaction Name.</h4>
<h4 style="margin-bottom:0px;margin-top:0px">3. Specify the Amount transfered.</h4>
<h4 style="margin-bottom:0px;margin-top:0px">4. Select GTB or FirstBank as appropriate.</h4>
<h4 style="margin-bottom:0px;margin-top:0px">5. Enter your transaction ID.</h4>
<h4 style="margin-top:0px">6. Specify if you would like your donations to be anonymous or would like 
the donation to be a "in memory of" or "in honour of" someone .</h4>
</div>
<div class="actions">
    <button class="ui green button" (click)="modal.approve(undefined)" autofocus>Proceed</button>
</div>
`
})

export class ConfirmModalDonorComponent {
    constructor(public modal: SuiModal<IConfirmModalContext, void, void>) { }
}

export class ConfirmModalDonor extends ComponentModalConfig<IConfirmModalContext, void, void> {
    constructor(title: string, size = ModalSize.Small) {
        super(ConfirmModalDonorComponent, { title });

        this.isClosable = false;
        this.transitionDuration = 200;
        this.size = size;
    }
}
