import { TestBed } from '@angular/core/testing';

import { ProductDataService } from './product-data.service';
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { HttpParams, provideHttpClient } from "@angular/common/http";
import { Product } from "../models/product";
import { Review } from "../models/review";

describe('ProductDataService', () => {
  let service: ProductDataService;
  let controller: HttpTestingController;

  const endpoints = {
    products: 'http://localhost:3000/products',
    reviews: 'http://localhost:3000/reviews?productId=1',
  };

  const mockProducts = [
    {id: 1, title: 'Product 1'},
  ];

  const mockReviews = [
    {id: 1, productId: 1},
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(ProductDataService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return product by id', () => {
    let product: Product | undefined;
    service.getProductById(1).subscribe(
      (p) => {
        product = p;
      }
    );

    const request = controller.expectOne(`${endpoints.products}/1`);
    expect(request.request.method).toBe('GET');
    request.flush(mockProducts[0]);

    expect(product).toEqual(mockProducts[0]);
  });

  it('should return products', () => {
    let result: Product[] | undefined;
    service.getProductsWithParams(new HttpParams()).subscribe(
      (p) => result = p
    );

    const request = controller.expectOne(`${endpoints.products}`);
    expect(request.request.method).toBe('GET');
    request.flush(mockProducts);

    expect(result).toEqual(mockProducts);
  });

  it('should update product', () => {
    let result: Product | undefined;
    service.updateProduct(mockProducts[0]).subscribe(
      (p) => result = p
    );

    const request = controller.expectOne(`${endpoints.products}/1`);
    expect(request.request.method).toBe('PUT');
    request.flush(mockProducts[0]);

    expect(result).toEqual(mockProducts[0]);
  });

  it('should delete product by id', () => {
    service.deleteProduct(1).subscribe();

    const request = controller.expectOne(`${endpoints.products}/1`);
    expect(request.request.method).toBe('DELETE');
    request.flush(null);
  });

  it('should return reviews product by id', () => {
    let reviews: Review[] | undefined;
    service.getReviewsByProductId(1).subscribe(
      (r) => reviews = r
    );

    const request = controller.expectOne(`${endpoints.reviews}`);
    expect(request.request.method).toBe('GET');
    request.flush(mockReviews);

    expect(reviews).toEqual(mockReviews);
  });
});
