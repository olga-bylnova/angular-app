import { ProductState } from "../models/product.model";
import { createFeatureSelector, createSelector } from "@ngrx/store";

export const selectProductState =
  createFeatureSelector<ProductState>('products');

export const selectProducts = createSelector(
  selectProductState,
  (state) => state.products
);
