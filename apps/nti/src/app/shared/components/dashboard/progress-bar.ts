import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'bpp-progress',
  template: `
<div class="progress">
	<svg class="progress__svg" width="120" height="120" viewBox="0 0 120 120">
		<circle class="progress__meter" cx="60" cy="60" [attr.r]="radius" stroke-width="12" />
		<circle class="progress__value" [attr.stroke]="strok" [style.strokeDasharray]="circumference" [style.strokeDashoffset]="dashoffset" cx="60" cy="60"
		 [attr.r]="radius" stroke-width="12" />
	</svg>

  <div class="progress__value-text">{{value}}%</div>
</div>
  `,
  styles: [`
.progress {
  position: relative;
}

.progress__value-text {
  position: absolute;
  top: 40%;
  left: 45%;
  font-size: 20px;
}

.progress__svg {
  transform: rotate(-90deg);
}

.progress__meter,
.progress__value {
  fill: none;
}

.progress__meter {
  stroke: #ccc;
}

.progress__value {
  
  transition: all 100ms;
}
  `]
})


export class ProgressComponent implements OnInit, OnChanges {

  strok = ""
  @Input() value: number;
  radius = 54;
  circumference = 2 * Math.PI * this.radius;
  dashoffset: number;

  constructor() {
    this.progress;
  }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value.currentValue !== changes.value.previousValue) {
      this.progress(changes.value.currentValue);
    }
  }

  private progress(value: number) {
    this.initStroke(value)
    const progress = value / 100;
    this.dashoffset = this.circumference * (1 - progress);
  }

  private initStroke(value) {
    if (value === 100) {
      // green
      this.strok = "#4CAF50";
    }
    if (value > 25 && value < 100) {
      // amper
      this.strok ="#FFBF00";
    }
    if (value < 26) {
      // yellow
      this.strok = "red";
    }
  }
}
