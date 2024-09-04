import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appPositiveIntegerValidator]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: PositiveIntegerValidatorDirective,
      multi: true,
    },
  ],
  standalone: true
})
export class PositiveIntegerValidatorDirective implements Validator {
  regExp = /^\d+$/;

  validate(control: AbstractControl): ValidationErrors | null {
    if (control.value && !this.regExp.test(control.value)) {
      return { notIntegerValue: { value: control.value } };
    }

    return null;
  }
}