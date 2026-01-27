import { TestBed } from '@angular/core/testing';

import { CartDataService } from './cart-data.service';
import { provideHttpClient } from "@angular/common/http";
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { CartItem } from "../models/cart-item";

describe('CartDataService', () => {
  let service: CartDataService;
  let controller: HttpTestingController;

  const endpoints = {
    cart: 'http://localhost:3000/cart',
  };

  const mockCartItems = [
    {id: 1, title: 'Product 1', count: 1, price: 1},
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(CartDataService);
    controller = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    controller.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return cart item by id', () => {
    let cartItem: CartItem | undefined;
    service.getCartItemById(1).subscribe(
      c => cartItem = c
    );

    const request = controller.expectOne(`${endpoints.cart}/1`);
    expect(request.request.method).toBe('GET');

    request.flush(mockCartItems[0]);

    expect(cartItem).toEqual(mockCartItems[0]);
  });

  it('should update cart item', () => {
    let cartItem: CartItem | undefined;
    service.updateCartItem(mockCartItems[0]).subscribe(
      c => cartItem = c
    );

    const request = controller.expectOne(`${endpoints.cart}/1`);
    expect(request.request.method).toBe('PUT');

    request.flush(mockCartItems[0]);

    expect(cartItem).toEqual(mockCartItems[0]);
  });

  it('should delete cart item by id', () => {
    service.deleteCartItem(1).subscribe();

    const request = controller.expectOne(`${endpoints.cart}/1`);
    expect(request.request.method).toBe('DELETE');

    request.flush(null);
  });

  it('should return cart items', () => {
    let cartItems: CartItem[] | undefined;
    service.getCartItems().subscribe(
      c => cartItems = c
    );

    const request = controller.expectOne(`${endpoints.cart}`);
    expect(request.request.method).toBe('GET');

    request.flush(mockCartItems);

    expect(cartItems).toEqual(mockCartItems);
  });

  it('should create cart item', () => {
    let cartItem: CartItem | undefined;
    service.createCartItem(mockCartItems[0]).subscribe(
      c => cartItem = c
    );

    const request = controller.expectOne(`${endpoints.cart}`);
    expect(request.request.method).toBe('POST');

    request.flush(mockCartItems[0]);

    expect(cartItem).toEqual(mockCartItems[0]);
  });
});
