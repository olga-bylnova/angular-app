import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  constructor(private route: ActivatedRoute, private fb: FormBuilder) { }

  initializeForm() {
    const params = this.route.snapshot.queryParams;
    return this.fb.group({
      priceFrom: this.getNumber(params, 'priceForm'),
      priceTo: this.getNumber(params, 'priceTo'),
      ratingFrom: this.getNumber(params, 'ratingFrom'),
      ratingTo: this.getNumber(params, 'ratingTo'),
      inStock: this.getBoolean(params, 'inStock'),
      hasReviews: this.getBoolean(params, 'hasReviews')
    });
  }

  getNumber(params: Params, name: string): number | null {
    return params[name] ? Number([params[name]]) : null;
  }

  getBoolean(params: Params, name: string): boolean {
    return params[name] === 'true';
  }
}
