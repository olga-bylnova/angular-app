import { createReducer, on } from "@ngrx/store";
import { CartState } from "../models/cart.model";
import {
  createCartItem, createCartItemFailure, createCartItemSuccess,
  deleteCartItem, deleteCartItemFailure,
  deleteCartItemSuccess,
  loadCart,
  loadCartFailure,
  loadCartSuccess, updateCartItem, updateCartItemFailure, updateCartItemSuccess
} from "../actions/cart.actions";

const initialState: CartState = {
  cartItems: [],
  loading: false,
  error: null,
};

export const cartReducer = createReducer(
  initialState,
  on(loadCart, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadCartSuccess, (state, {cartItems}) => ({
    ...state,
    loading: false,
    cartItems,
  })),
  on(loadCartFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error,
  })),
  on(deleteCartItem, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(deleteCartItemSuccess, (state, {cartItemId}) => ({
    ...state,
    loading: false,
    cartItems: state.cartItems.filter((cartItem) => cartItem.id !== cartItemId),
  })),
  on(deleteCartItemFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error,
  })),
  on(createCartItem, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(createCartItemSuccess, (state, {cartItem}) => ({
    ...state,
    loading: false,
    cartItems: [...state.cartItems, cartItem],
  })),
  on(createCartItemFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error,
  })),
  on(updateCartItem, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(updateCartItemSuccess, (state, {newCartItem}) => ({
    ...state,
    loading: false,
    cartItems: state.cartItems.map(
      (c) => c.id === newCartItem.id ? newCartItem : c
    ),
  })),
  on(updateCartItemFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error,
  })),
);
