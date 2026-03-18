import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CartState } from "../models/cart.model";

export const selectCartState =
  createFeatureSelector<CartState>('cart');

export const selectCartItems = createSelector(
  selectCartState,
  (state) => state.cartItems,
);
