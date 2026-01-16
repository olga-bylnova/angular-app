import {
  deleteProduct, deleteProductFailure,
  deleteProductSuccess,
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess, updateProduct, updateProductFailure, updateProductSuccess
} from "../actions/product.actions";
import { createReducer, on } from "@ngrx/store";
import { ProductState } from "../models/product.model";

const initialState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

export const productReducer = createReducer(
  initialState,
  on(loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadProductsSuccess, (state, {products}) => ({
    ...state,
    loading: false,
    products,
  })),
  on(loadProductsFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error,
  })),
  on(deleteProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(deleteProductSuccess, (state, {productCode}) => ({
    ...state,
    loading: false,
    products: state.products.filter((product) => product.id !== productCode),
  })),
  on(deleteProductFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error,
  })),
  on(updateProduct, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(updateProductSuccess, (state, {newProduct}) => ({
    ...state,
    loading: false,
    products: state.products.map(p =>
      p.id === newProduct.id ? newProduct : p
    ),
  })),
  on(updateProductFailure, (state, {error}) => ({
    ...state,
    loading: false,
    error,
  }))
);
