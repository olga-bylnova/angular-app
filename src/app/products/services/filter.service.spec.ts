import { TestBed } from '@angular/core/testing';

import { FilterService } from './filter.service';
import { ActivatedRoute } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { FILTERS } from "../util/filters.constants";

describe('FilterService', () => {
  let service: FilterService;

  const activatedRouteMock = {snapshot: {queryParams: {}}};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FormBuilder,
        {provide: ActivatedRoute, useValue: activatedRouteMock},
      ]
    });
    service = TestBed.inject(FilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  afterEach(() => {
    activatedRouteMock.snapshot.queryParams = {};
  });

  describe('initializeForm', () => {
    it('should create form with default values', () => {
      const form = service.initializeForm();

      expect(form.value).toEqual({
        priceFrom: null,
        priceTo: null,
        ratingFrom: null,
        ratingTo: null,
        inStock: null,
        hasReviews: null,
      });
    });

    it('should initialize form with query params', () => {
      activatedRouteMock.snapshot.queryParams = {
        priceFrom: '4',
        priceTo: '10',
        ratingFrom: '1',
        inStock: 'true',
      }
      const form = service.initializeForm();

      expect(form.value as any).toEqual({
        priceFrom: 4,
        priceTo: 10,
        ratingFrom: 1,
        ratingTo: null,
        inStock: true,
        hasReviews: null,
      });
    });
  });

  describe('getFormUpdateValue', () => {
    it('should return empty value if there are no query params', () => {
      const values = service.getFormUpdateValue();

      const expected: any = {};
      for (const key of FILTERS.keys()) {
        expected[key] = null;
      }

      expect(values).toEqual(expected);
    });

    it('should convert "true" to boolean', () => {
      activatedRouteMock.snapshot.queryParams = {inStock: 'true'};
      const values = service.getFormUpdateValue();

      expect(values['inStock']).toBeTrue();
    });

    it('should convert numeric strings to numbers', () => {
      activatedRouteMock.snapshot.queryParams = {priceFrom: '3', priceTo: '10'};
      const values = service.getFormUpdateValue();

      expect(values['priceFrom']).toEqual(3);
      expect(values['priceTo']).toEqual(10);
    });

    it('should return null for non-numeric strings', () => {
      activatedRouteMock.snapshot.queryParams = {priceFrom: 'abc'};
      const values = service.getFormUpdateValue();

      expect(values['priceFrom']).toEqual(null);
    });
  });
});
