import { Component, inject } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FilterService } from '../../services/filter.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  filterForm: FormGroup;
  filterService: FilterService = inject(FilterService);
  isFormFilled = false;

  constructor(private router: Router) {
    this.filterForm = this.filterService.initializeForm();
  }

  ngOnInit() {
    this.isFormFilled = Object.values(this.filterForm.value).some(this.isValueFilled);

    this.filterForm.valueChanges.subscribe(values => {
      this.isFormFilled = Object.values(values).some(this.isValueFilled);
    });
  }

  applyFilters() {
    const filters = Object.fromEntries(
      Object.entries(this.filterForm.value).filter(([, value]) => value !== false)
    );

    this.router.navigate([''], { queryParams: filters });
  }

  resetFilters() {
    this.filterForm.reset();
    this.router.navigate(['']);
  }

  isValueFilled(value: any): boolean {
    return value !== null && value !== false && value !== '';
  }

  get ratingFrom() {
    return this.filterForm.get('ratingFrom');
  }

  get ratingTo() {
    return this.filterForm.get('ratingTo');
  }

  get priceTo() {
    return this.filterForm.get('priceTo');
  }

  get priceFrom() {
    return this.filterForm.get('priceFrom');
  }
}
