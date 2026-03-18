import { createAction, props } from "@ngrx/store";
import { CartItem } from "../../cart/models/cart-item";
import { Product } from "../../products/models/product";

export const loadCart = createAction(
  '[Cart API] Load Cart'
);

export const loadCartSuccess = createAction(
  '[Cart API] Load Cart Success',
  props<{ cartItems: CartItem[] }>()
);

export const loadCartFailure = createAction(
  '[Cart API] Load Cart Failure',
  props<{ error: any }>()
);

export const deleteCartItem = createAction(
  '[Cart API] Delete Cart Item',
  props<{ cartItemId: number }>()
);

export const deleteCartItemSuccess = createAction(
  '[Cart API] Delete Cart Item Success',
  props<{ cartItemId: number }>()
);

export const deleteCartItemFailure = createAction(
  '[Cart API] Delete Cart Item Failure',
  props<{ error: any }>()
);

export const createCartItem = createAction(
  '[Cart API] Create Cart Item',
  props<{ product: Product, productCount: number }>()
);

export const createCartItemSuccess = createAction(
  '[Cart API] Create Cart Item Success',
  props<{ cartItem: CartItem }>()
);

export const createCartItemFailure = createAction(
  '[Cart API] Create Cart Item Failure',
  props<{ error: any }>()
);

export const updateCartItem = createAction(
  '[Cart API] Update Cart Item',
  props<{ cartItem: CartItem, productCount: number }>()
);

export const updateCartItemSuccess = createAction(
  '[Cart API] Update Cart Item Success',
  props<{ newCartItem: CartItem }>()
);

export const updateCartItemFailure = createAction(
  '[Cart API] Update Cart Item Failure',
  props<{ error: any }>()
);

