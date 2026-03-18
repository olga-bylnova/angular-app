import { Observable, of, throwError } from "rxjs";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { ProductEffects } from "./product.effects";
import { ProductService } from "../../products/services/product.service";
import {
  deleteProduct, deleteProductFailure,
  deleteProductSuccess,
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess, updateProduct, updateProductFailure, updateProductSuccess
} from "../actions/product.actions";
import { Router } from "@angular/router";

describe('ProductEffects', () => {
  let actions$: Observable<any>;
  let effects: ProductEffects;
  let productService: jasmine.SpyObj<ProductService>;
  let router: jasmine.SpyObj<Router>;

  const mockProducts = [
    {id: 1, title: 'Product 1'},
    {id: 2, title: 'Product 2'},
  ];

  beforeEach(() => {
    productService = jasmine.createSpyObj('ProductService', [
      'getFilteredProducts',
      'deleteProductById',
      'updateProduct',
    ]);
    router = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        ProductEffects,
        provideMockActions(() => actions$),
        {provide: ProductService, useValue: productService},
        {provide: Router, useValue: router}
      ],
    });

    effects = TestBed.inject(ProductEffects);
  });

  it('should return loadProductsSuccess', (done) => {
    productService.getFilteredProducts.and.returnValue(of(mockProducts));

    actions$ = of(loadProducts({filters: {}}));

    effects.loadProducts$.subscribe((result) => {
      expect(result).toEqual(loadProductsSuccess({products: mockProducts}));
      done();
    });
  });

  it('should return loadProductsFailure when there is an error', (done) => {
    productService.getFilteredProducts.and.returnValue(throwError(() => 'Server error'));

    actions$ = of(loadProducts({filters: {}}));

    effects.loadProducts$.subscribe((result) => {
      expect(result).toEqual(loadProductsFailure({error: 'Server error'}));
      done();
    });
  });

  it('should return deleteProductSuccess', (done) => {
    productService.deleteProductById.and.returnValue(of(void 0));

    actions$ = of(deleteProduct({productCode: 1}));

    effects.deleteProduct$.subscribe((result) => {
      expect(result).toEqual(deleteProductSuccess({productCode: 1}));
      done();
    });
  });

  it('should return deleteProductFailure when there is an error', (done) => {
    productService.deleteProductById.and.returnValue(throwError(() => 'Server error'));

    actions$ = of(deleteProduct({productCode: 1}));

    effects.deleteProduct$.subscribe((result) => {
      expect(result).toEqual(deleteProductFailure({error: 'Server error'}));
      done();
    });
  });

  it('should return updateProductSuccess', (done) => {
    productService.updateProduct.and.returnValue(of(mockProducts[0]));

    actions$ = of(updateProduct({productDto: {title: 'New product'}, productCode: 1}));

    effects.updateProduct$.subscribe((result) => {
      expect(result).toEqual(updateProductSuccess({newProduct: mockProducts[0]}));
      done();
    });
  });

  it('should return updateProductFailure when there is an error', (done) => {
    productService.updateProduct.and.returnValue(throwError(() => 'Server error'));

    actions$ = of(updateProduct({productDto: {title: 'New product'}, productCode: 1}));

    effects.updateProduct$.subscribe((result) => {
      expect(result).toEqual(updateProductFailure({error: 'Server error'}));
      done();
    });
  });

  it('should navigate on updateProductSuccess', (done) => {
    actions$ = of(updateProductSuccess({newProduct: mockProducts[0]}));

    effects.updateProductSuccess$.subscribe(() => {
      expect(router.navigate).toHaveBeenCalledWith(['']);
      done();
    });
  });
});
