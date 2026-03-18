import { Observable, of, throwError } from "rxjs";
import { TestBed } from "@angular/core/testing";
import { provideMockActions } from "@ngrx/effects/testing";
import { CartService } from "../../cart/services/cart.service";
import { CartEffects } from "./cart.effects";
import {
  createCartItem,
  createCartItemFailure, createCartItemSuccess,
  deleteCartItem, deleteCartItemFailure,
  deleteCartItemSuccess,
  loadCart,
  loadCartFailure,
  loadCartSuccess, updateCartItem, updateCartItemFailure, updateCartItemSuccess
} from "../actions/cart.actions";

describe('CartEffects', () => {
  let actions$: Observable<any>;
  let effects: CartEffects;
  let cartService: jasmine.SpyObj<CartService>;

  const mockCartItems = [
    {id: 1, title: 'Cart Item 1', count: 1, price: 10},
    {id: 2, title: 'Cart Item 2', count: 1, price: 10},
  ];

  beforeEach(() => {
    cartService = jasmine.createSpyObj('CartService', [
      'getCartItems',
      'deleteCartItem',
      'createCartItem',
      'updateCartItem',
    ]);

    TestBed.configureTestingModule({
      providers: [
        CartEffects,
        provideMockActions(() => actions$),
        {provide: CartService, useValue: cartService},
      ],
    });

    effects = TestBed.inject(CartEffects);
  });

  it('should return loadCartSuccess', (done) => {
    cartService.getCartItems.and.returnValue(of(mockCartItems));

    actions$ = of(loadCart());

    effects.loadCart$.subscribe((result) => {
      expect(result).toEqual(loadCartSuccess({cartItems: mockCartItems}));
      done();
    });
  });

  it('should return loadCartFailure when there is an error', (done) => {
    cartService.getCartItems.and.returnValue(throwError(() => 'Server error'));

    actions$ = of(loadCart());

    effects.loadCart$.subscribe((result) => {
      expect(result).toEqual(loadCartFailure({error: 'Server error'}));
      done();
    });
  });

  it('should return deleteCartItemSuccess', (done) => {
    cartService.deleteCartItem.and.returnValue(of(void 0));

    actions$ = of(deleteCartItem({cartItemId: 1}));

    effects.deleteCartItem$.subscribe((result) => {
      expect(result).toEqual(deleteCartItemSuccess({cartItemId: 1}));
      done();
    });
  });

  it('should return deleteCartItemFailure when there is an error', (done) => {
    cartService.deleteCartItem.and.returnValue(throwError(() => 'Server error'));

    actions$ = of(deleteCartItem({cartItemId: 1}));

    effects.deleteCartItem$.subscribe((result) => {
      expect(result).toEqual(deleteCartItemFailure({error: 'Server error'}));
      done();
    });
  });

  it('should return createCartItemSuccess', (done) => {
    cartService.createCartItem.and.returnValue(of(mockCartItems[0]));

    actions$ = of(createCartItem({product: {id: 1}, productCount: 1}));

    effects.createCartItem$.subscribe((result) => {
      expect(result).toEqual(createCartItemSuccess({cartItem: mockCartItems[0]}));
      done();
    });
  });

  it('should return createCartItemFailure when there is an error', (done) => {
    cartService.createCartItem.and.returnValue(throwError(() => 'Server error'));

    actions$ = of(createCartItem({product: {id: 1}, productCount: 1}));

    effects.createCartItem$.subscribe((result) => {
      expect(result).toEqual(createCartItemFailure({error: 'Server error'}));
      done();
    });
  });

  it('should return updateCartItemSuccess', (done) => {
    cartService.updateCartItem.and.returnValue(of(mockCartItems[0]));

    actions$ = of(updateCartItem({cartItem: mockCartItems[0], productCount: 1}));

    effects.updateCartItem$.subscribe((result) => {
      expect(result).toEqual(updateCartItemSuccess({newCartItem: mockCartItems[0]}));
      done();
    });
  });

  it('should return updateCartItemFailure when there is an error', (done) => {
    cartService.updateCartItem.and.returnValue(throwError(() => 'Server error'));

    actions$ = of(updateCartItem({cartItem: mockCartItems[0], productCount: 1}));

    effects.updateCartItem$.subscribe((result) => {
      expect(result).toEqual(updateCartItemFailure({error: 'Server error'}));
      done();
    });
  });
});
