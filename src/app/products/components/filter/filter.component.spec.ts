import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterComponent } from './filter.component';
import { FilterService } from "../../services/filter.service";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

describe('FilterComponent', () => {
  let component: FilterComponent;
  let fixture: ComponentFixture<FilterComponent>;
  let mockFilterService = jasmine.createSpyObj<FilterService>(
    'FilterService',
    ['initializeForm']
  );
  const routeMock = {navigate: jasmine.createSpy('navigate')};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterComponent],
      providers: [
        {provide: FilterService, useValue: mockFilterService},
        {provide: Router, useValue: routeMock}
      ],
    })
      .compileComponents();

    mockFilterService.initializeForm.and.returnValue(new FormBuilder().group({
      priceFrom: 4,
      priceTo: 10,
      ratingFrom: 1,
      ratingTo: null,
      inStock: true,
      hasReviews: null,
    }));
    fixture = TestBed.createComponent(FilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form', () => {
    expect(component.filterForm.value).toEqual({
      priceFrom: 4,
      priceTo: 10,
      ratingFrom: 1,
      ratingTo: null,
      inStock: true,
      hasReviews: null,
    });
  });

  it('should set isFormFilled to true if filterForm is not empty', () => {
    component.ngOnInit();

    expect(component.isFormFilled).toBeTrue();
  });

  it('should set isFormFilled to false if filterForm is empty', () => {
    component.ngOnInit();
    component.filterForm.setValue({
      priceFrom: null,
      priceTo: null,
      ratingFrom: null,
      ratingTo: null,
      inStock: null,
      hasReviews: null,
    });

    expect(component.isFormFilled).toBeFalse();
  });

  it('should change isFormFilled back to false when form is cleared', () => {
    component.ngOnInit();

    expect(component.isFormFilled).toBeTrue();

    component.filterForm.reset();
    expect(component.isFormFilled).toBeFalse();
  });

  it('should navigate with filtered query params', () => {
    component.applyFilters();

    expect(routeMock.navigate).toHaveBeenCalledWith([''],
      {
        queryParams: {
          priceFrom: 4,
          priceTo: 10,
          ratingFrom: 1,
          ratingTo: null,
          inStock: true,
          hasReviews: null,
        }
      });
  });

  it('should reset form and navigate to home page', () => {
    component.resetFilters();

    expect(component.filterForm.value).toEqual({
      priceFrom: null,
      priceTo: null,
      ratingFrom: null,
      ratingTo: null,
      inStock: null,
      hasReviews: null,
    });
    expect(routeMock.navigate).toHaveBeenCalledWith(['']);
  });

  it('should disable apply filters button if form is empty', () => {
    component.isFormFilled = false;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('button[type="submit"]').disabled).toBeTrue();
  });

  it('should disable apply filters button if form is empty', () => {
    component.isFormFilled = true;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('button[type="submit"]').disabled).toBeFalse();
  });
});
