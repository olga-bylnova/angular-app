import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  constructor(private route: ActivatedRoute) { }

  initializeForm(form: FormGroup) {
    const params = this.route.snapshot.queryParams;
    form.patchValue({
      priceFrom: params['priceFrom'] || '',
      priceTo: params['priceTo'] || '',
      ratingFrom: params['ratingFrom'] || '',
      ratingTo: params['ratingTo'] || '',
      inStock: params['inStock'] === 'true',
      hasReviews: params['hasReviews'] === 'true'
    });
  }
}
