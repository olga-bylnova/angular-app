import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  filterForm: FormGroup;
  filterService: FilterService = inject(FilterService);

  constructor(private fb: FormBuilder, private router: Router) {
    this.filterForm = this.fb.group({
      priceFrom: [''],
      priceTo: [''],
      ratingFrom: [''],
      ratingTo: [''],
      inStock: [false],
      hasReviews: [false]
    });

    this.filterService.initializeForm(this.filterForm);
  }

  applyFilters() {
    const filters = this.filterForm.value;
    this.router.navigate([''], { queryParams: filters });
  }

  resetFilters() {
    this.filterForm.reset();
    this.router.navigate(['']);
  }
}
