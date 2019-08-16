import { Component, OnDestroy } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { SharedValidators } from '../../../shared/components/validators/common'
import { RegisterProvider } from '../../providers/register'
import { takeUntil } from 'rxjs/operators'
import { Subject } from 'rxjs/Subject';


@Component({
  selector: 'nti-user-register',
  templateUrl: './register.html',
  styleUrls: ['./register.less'],
})

export class RegisterContainer implements OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  totalUnread: number = 0;
  unRead: any[];
  edit: boolean;
  registerForm: FormGroup
  optionPopulated: boolean = false
  formSubmitAttempt: boolean
  disabled: boolean

  //Add Registering details
  success: boolean;
  error: string | null;
  pending: boolean;

  constructor(private fb: FormBuilder, private _register: RegisterProvider) {
    this.registerForm = this.fb.group({
      matriculationNumber: ["", [Validators.required, SharedValidators.strongMatric]],
      password: ["", [Validators.required, SharedValidators.strongPassword]],
      phoneNumber: ["", [Validators.required, SharedValidators.strongPhone]],
      email: ["", [Validators.required, SharedValidators.email]],
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],

    })
  }


  isFieldValid(field: string) {
    return (
      (!this.registerForm.get(field).valid &&
        this.registerForm.get(field).touched) ||
      (this.registerForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  displayFieldCss(field: string) {
    return {
      error: this.isFieldValid(field)
    };
  }

  submit() {
    this.success = false;
    this.error = null;
    this.pending = true;
    if (this.registerForm.valid) {
      this._register.addRegister({ body: this.registerForm.value }).pipe(
        takeUntil(this.unsubscribe$))
        .subscribe(() => {
          this.pending = false;
          this.success = true;
          this.registerForm.reset();
        },
          error => {
            this.pending = false;
            this.error = error.error.error;
          }
        )
    }
    else
    {
      this.pending = false;
      this.formSubmitAttempt = true;
    }

  }
  ngOnDestroy() {

  }
}