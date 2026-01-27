import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';
import { ProductDataService } from "./product-data.service";
import { of } from "rxjs";
import { EditProductDto } from "../models/edit-product-dto";
import { Product } from "../models/product";
import { Review } from "../models/review";

describe('ProductService', () => {
  let service: ProductService;
  let productDataService: jasmine.SpyObj<ProductDataService>;

  const mockProducts: Product[] = [
    {id: 1, title: 'Product 1', price: 10, description: 'Product 1', image: 'img', stock: 5},
  ];

  const mockReviews: Review[] = [
    {id: 1, productId: 1},
  ];

  beforeEach(() => {
    const productDataServiceSpy = jasmine.createSpyObj('ProductDataService', [
      'deleteProduct',
      'getProductById',
      'getReviewsByProductId',
      'getProductsWithParams',
      'updateProduct',
    ]);

    TestBed.configureTestingModule({
      providers: [{provide: ProductDataService, useValue: productDataServiceSpy}]
    });

    service = TestBed.inject(ProductService);
    productDataService = TestBed.inject(ProductDataService) as jasmine.SpyObj<ProductDataService>;

    productDataService.getProductById.and.returnValue(of(mockProducts[0]));
    productDataService.getProductsWithParams.and.returnValue(of(mockProducts));
    productDataService.getReviewsByProductId.and.returnValue(of(mockReviews));
    productDataService.updateProduct.and.returnValue(of(mockProducts[0]));
    productDataService.deleteProduct.and.returnValue(of());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should delete product by id', () => {
    service.deleteProductById(1).subscribe();

    expect(productDataService.deleteProduct).toHaveBeenCalledWith(1);
  });

  it('should return product by id', () => {
    service.getProductById(1).subscribe(
      (product) => {
        expect(product).toEqual(mockProducts[0]);
      }
    );

    expect(productDataService.getProductById).toHaveBeenCalledWith(1);
  });

  it('should return reviews by product id', () => {
    service.getReviewsByProductId(1).subscribe(
      (reviews) => {
        expect(reviews).toEqual(mockReviews);
      }
    );

    expect(productDataService.getReviewsByProductId).toHaveBeenCalledWith(1);
  });

  describe('getFilteredProducts', () => {
    it('should return filtered products with correct filters', () => {
      const mockFilterString = {priceFrom: '1', priceTo: '5', inStock: 'true'};
      const httpParamsToString = 'price_gte=1&price_lte=5&stock_ne=0';

      service.getFilteredProducts(mockFilterString).subscribe(
        (products) => {
          expect(products).toEqual(mockProducts);
        }
      );

      const actualParams =
        (productDataService.getProductsWithParams as jasmine.Spy).calls.mostRecent().args[0];

      expect(actualParams.toString()).toBe(httpParamsToString);
    });

    it('should return filtered products excluding non-existent filters', () => {
      const mockFilterString = {ratingFrom: '1', ratingTo: '5', hasReviews: 'true', stockFrom: '2'};
      const httpParamsToString = 'rating.rate_gte=1&rating.rate_lte=5&rating.count_ne=0';

      service.getFilteredProducts(mockFilterString).subscribe(
        (products) => {
          expect(products).toEqual(mockProducts);
        }
      );

      const actualParams =
        (productDataService.getProductsWithParams as jasmine.Spy).calls.mostRecent().args[0];

      expect(actualParams.toString()).toBe(httpParamsToString);
    });
  });

  it('should update existing product', () => {
    let newProduct: EditProductDto = {title: 'newProduct', price: 15};
    let productToUpdate: Product = {
      id: 1,
      title: 'newProduct',
      price: 15,
      description: 'Product 1',
      image: 'img',
      stock: 5
    };

    service.updateProduct(newProduct, 1).subscribe(
      (updatedProduct) => {
        expect(updatedProduct).toEqual(mockProducts[0]);
      }
    );

    expect(productDataService.updateProduct).toHaveBeenCalledWith(productToUpdate);
    expect(productDataService.getProductById).toHaveBeenCalledWith(1);
  });
});
