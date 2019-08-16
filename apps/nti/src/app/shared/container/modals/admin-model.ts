import { Component } from "@angular/core"
import { SuiModal, ComponentModalConfig, ModalSize } from "ng2-semantic-ui"

interface IConfirmModalContext {
    title: string;
    question: string;
}

@Component({
    selector: 'modal-confirm',
    template: `
<div class="header" style="text-align:center;color:green">{{ modal.context.title }}</div>
<div class="content" style="text-align:center">
    <p>{{ modal.context.question }}</p>
</div>
<div class="actions">
    <button class="ui green button" (click)="modal.approve(undefined)" autofocus>OK</button>
</div>
`
})

export class ConfirmModalComponent {
    constructor(public modal: SuiModal<IConfirmModalContext, void, void>) { }
}

export class ConfirmModal extends ComponentModalConfig<IConfirmModalContext, void, void> {
    constructor(title:string, question:string, size = ModalSize.Small) {
        super(ConfirmModalComponent, { title, question });

        this.isClosable = false;
        this.transitionDuration = 200;
        this.size = size;
    }
}
