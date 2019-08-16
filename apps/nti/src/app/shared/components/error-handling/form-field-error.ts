import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'nti-field-error-display',
    template: `
    <div *ngIf="displayError" >
      <div style="background: none!important;" class="ui pointing red basic label" [style.position]="position">
           {{errorMsg}}
        </div>
        </div>
  `,
    styles: [`
  `]
})
export class FieldErrorDisplayComponent {
    @Input() pointerDirection: string;
    @Input() errorMsg: string;
    @Input() displayError: boolean;
    @Input() position: string;

    constructor()
    {
      this.position = "relative";
    }
}