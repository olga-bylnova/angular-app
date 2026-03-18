import { TestBed } from '@angular/core/testing';

import { CartService } from './cart.service';
import { CartDataService } from "./cart-data.service";
import { of } from "rxjs";
import { Product } from "../../products/models/product";
import { CartItem } from "../models/cart-item";

describe('CartService', () => {
  let service: CartService;
  let cartDataService: jasmine.SpyObj<CartDataService>;

  const mockCartItems = [
    {id: 1, title: 'Product 1', count: 1, price: 10},
  ];

  beforeEach(() => {
    const cartDataServiceSpy = jasmine.createSpyObj(CartDataService, [
        'getCartItemById',
        'updateCartItem',
        'createCartItem',
        'getCartItems',
        'deleteCartItem'
      ]
    );
    TestBed.configureTestingModule({
      providers: [{provide: CartDataService, useValue: cartDataServiceSpy}]
    });
    service = TestBed.inject(CartService);
    cartDataService = TestBed.inject(CartDataService) as jasmine.SpyObj<CartDataService>;

    cartDataService.getCartItemById.and.returnValue(of(mockCartItems[0]));
    cartDataService.getCartItems.and.returnValue(of(mockCartItems));
    cartDataService.createCartItem.and.returnValue(of(mockCartItems[0]));
    cartDataService.deleteCartItem.and.returnValue(of());
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return cart items', () => {
    service.getCartItems().subscribe(
      cartItems => expect(cartItems).toEqual(mockCartItems)
    );
  });

  it('should return cart item by id', () => {
    service.getCartItemById(1).subscribe(
      cartItem => expect(cartItem).toEqual(mockCartItems[0])
    );
  });

  it('should delete cart item', () => {
    service.deleteCartItem(1).subscribe();

    expect(cartDataService.deleteCartItem).toHaveBeenCalledWith(1);
  });

  describe('createCartItem', () => {
    it('should create cart item from product', () => {
      const mockProduct: Product = {id: 1, title: 'Product 1', price: 10};
      service.createCartItem(mockProduct,1).subscribe(
        newCartItem => expect(newCartItem).toEqual(mockCartItems[0])
      );

      expect(cartDataService.createCartItem).toHaveBeenCalledWith(mockCartItems[0]);
    });

    it('should create cart item with 0 price if product has no price', () => {
      const mockProduct: Product = {id: 1, title: 'Product 1'};
      const mockCartItem: CartItem = {id: 1, title: 'Product 1', count: 1, price: 0};
      service.createCartItem(mockProduct,1).subscribe();

      expect(cartDataService.createCartItem).toHaveBeenCalledWith(mockCartItem);
    });
  });

  it('should update cart item', () => {
    const mockCartItem: CartItem = {id: 1, title: 'Product 1', count: 5, price: 10};
    cartDataService.updateCartItem.and.returnValue(of(mockCartItem));

    service.updateCartItem(mockCartItems[0],5).subscribe(
      newCartItem => expect(newCartItem).toEqual(mockCartItem)
    );

    expect(cartDataService.updateCartItem).toHaveBeenCalledWith(mockCartItem);
  });
});
