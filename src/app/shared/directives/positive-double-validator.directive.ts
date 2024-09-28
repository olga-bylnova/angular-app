import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[appPositiveDoubleValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PositiveDoubleValidatorDirective,
      multi: true,
    },
  ],
  standalone: true
})
export class PositiveDoubleValidatorDirective {
  regExp = /^\d+(\.\d+)?$/;

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value && !this.regExp.test(control.value)) {
      return { notDoubleValue: { value: control.value } };
    }

    return null;
  }
}
