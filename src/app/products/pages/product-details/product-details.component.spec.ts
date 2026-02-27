import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsComponent } from './product-details.component';
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "../../services/product.service";
import { of } from "rxjs";
import { Review } from "../../models/review";
import { CartService } from "../../../cart/services/cart.service";
import { provideMockStore } from "@ngrx/store/testing";

describe('ProductDetailsComponent', () => {
  let component: ProductDetailsComponent;
  let fixture: ComponentFixture<ProductDetailsComponent>;
  let mockProductService = jasmine.createSpyObj<ProductService>("ProductService",
    ["getProductById", "getReviewsByProductId"]);
  let mockCartService = jasmine.createSpyObj<CartService>("CartService", ["getCartItemById"]);

  const activatedRouteMock = {snapshot: {params: {id: 1}}};
  const mockProduct = {id: 1, title: 'Product 1', stock: 1, image: 'img'};
  const mockReviews: Review[] = [
    {id: 1, productId: 1},
  ];
  const mockCartItem = {id: 1, title: 'Product 1', count: 1, price: 10};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailsComponent],
      providers: [
        {provide: ActivatedRoute, useValue: activatedRouteMock},
        {provide: ProductService, useValue: mockProductService},
        {provide: CartService, useValue: mockCartService},
        provideMockStore({})
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductDetailsComponent);
    component = fixture.componentInstance;
    mockProductService.getProductById.and.returnValue(of(mockProduct));
    mockProductService.getReviewsByProductId.and.returnValue(of(mockReviews));
    mockCartService.getCartItemById.and.returnValue(of(mockCartItem));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize outOfStock to false is product has stock', () => {
    component.ngOnInit();

    expect(component.isOutOfStock).toBeFalse();
  });

  it('should initialize outOfStock to true is product has no stock', () => {
    mockProductService.getProductById.and.returnValue(of({id: 1}));
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.isOutOfStock).toBeTrue();
  });

  it('should initialize cartItem', () => {
    component.ngOnInit();

    expect(component.cartItem).toEqual(mockCartItem);
  });

  it('should initialize reviews', () => {
    component.ngOnInit();

    expect(mockProductService.getReviewsByProductId).toHaveBeenCalledWith(1);
    component.reviews$.subscribe(reviews => expect(reviews[0]).toEqual(mockReviews[0]));
  });

  it('should display product title, price, rating and description', () => {
    const nativeElement = fixture.nativeElement as HTMLElement;
    expect(nativeElement.querySelector('.product-title')?.textContent).toContain('Product 1');
    expect(nativeElement.querySelector('.product-description')).toBeTruthy();
    expect(nativeElement.querySelector('img')?.getAttribute('src')).toBe(mockProduct.image || '');
  });
});
