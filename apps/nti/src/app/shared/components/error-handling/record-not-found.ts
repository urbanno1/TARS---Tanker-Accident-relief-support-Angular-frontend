import { Component, Input } from '@angular/core';

@Component({
  selector: 'bpp-no-record-found',
  template: `
<div style="border-top:1px solid #d4d4d5!important;" class="ui center aligned  icon message" [ngClass]="type"  id="not-found-msg" >
  <div class="content">
    <div *ngIf="title" class="header">
      {{title}}
    </div>
  <i class="icon" [ngClass]="icon" style="color: darkgray"></i>
    <p>{{message}}.</p>
  </div>
</div>
  `,
  styles: [`
  #not-found-msg{

    height: 200px;

  }
  `]
})
export class NoRecordFound {
  @Input() type: string;
  @Input() title: string;
  @Input() icon: string="big bell icon";
  @Input() message: string = "No record found";
  constructor() { }

}