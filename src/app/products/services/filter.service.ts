import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FILTERS } from '../util/filters.constants';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }

  initializeForm() {
    const formGroup = this.fb.group({
      priceFrom: [null, { validators: [Validators.min(0)] }],
      priceTo: [null, { validators: [Validators.min(0)] }],
      ratingFrom: [null, { validators: [Validators.min(0), Validators.max(5)] }],
      ratingTo: [null, { validators: [Validators.min(0), Validators.max(5)] }],
      inStock: null,
      hasReviews: null
    });
    formGroup.patchValue(this.getFormUpdateValue());
    return formGroup;
  }

  getFormUpdateValue() {
    const params = this.route.snapshot.queryParams;
    const formValues: { [key: string]: any } = {};
    for (let key of FILTERS.keys()) {
      if (params[key]) {
        if (params[key] === 'true') {
          formValues[key] = true;
        } else {
          formValues[key] = this.getNumber(params[key]);
        }
      } else {
        formValues[key] = null;
      }
    }
    return formValues;
  }

  getNumber(value: string): number | null {
    const numberValue = Number(value);
    return isNaN(numberValue) ? null : numberValue;
  }
}
