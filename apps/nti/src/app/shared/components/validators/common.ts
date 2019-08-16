import { FormControl, FormGroup } from '@angular/forms';

interface ValidationResult {
    [key: string]: boolean;
}


export class SharedValidators {


    static email(control: FormControl): ValidationResult {
        // tslint:disable-next-line:max-line-length
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (control.value !== '' && re.test(control.value)) {
            return null;
        }

        return { 'email': true };
    }


    static strongPassword(control:FormControl):ValidationResult {
       // const re = /^.{6,}$/
       const re = /^.{6,}$/
            if (control.value !== '' && re.test(control.value)) {
            return null;
        }
        return { 'strongPassword': true };
    }

    static strongMatric(control:FormControl):ValidationResult {
        const re = /^(?=.*\d)(?=.*[a-zA-Z]).{10,10}$/
            if (control.value !== '' && re.test(control.value)) {
            return null;
        }
        return { 'strongMatric': true };
    }

    static strongPhone(control:FormControl):ValidationResult {
        const re = /^.{8,}$/
            if (control.value !== '' && re.test(control.value)) {
            return null;
        }
        return { 'strongPhone': true };
    }

    static hash(control: FormControl): ValidationResult {
        const re = /^[a-zA-Z\d-_]+$/;
        if (control.value !== '' && re.test(control.value)) {
            return null;
        }

        return { 'hash': true };
    }

    static columnName(control: FormControl): ValidationResult {
        const re = /^[a-zA-Z\d_]+$/;
        if (control.value !== '' && re.test(control.value)) {
            return null;
        }
        return { 'columnName': true };
    }


    static matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup): { [key: string]: any } => {
            const password = group.controls[passwordKey];
            const confirmPassword = group.controls[confirmPasswordKey];
            if (!password || !confirmPassword) { return null; }
            return password.value === confirmPassword.value ? null : { matchingPasswords: true };
        };
    }





}
