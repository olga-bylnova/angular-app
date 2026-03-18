import { createAction, props } from "@ngrx/store";
import { Product } from "../../products/models/product";
import { EditProductDto } from "../../products/models/edit-product-dto";

export const loadProducts = createAction(
  '[Product API] Load Products',
  props<{ filters: { [key: string]: string } }>()
);

export const loadProductsSuccess = createAction(
  '[Product API] Load Products Success',
  props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
  '[Product API] Load Products Failure',
  props<{ error: any }>()
);

export const deleteProduct = createAction(
  '[Product API] Delete Product',
  props<{ productCode: number }>()
);

export const deleteProductSuccess = createAction(
  '[Product API] Delete Product Success',
  props<{ productCode: number }>()
);

export const deleteProductFailure = createAction(
  '[Product API] Delete Product Failure',
  props<{ error: any }>()
);

export const updateProduct = createAction(
  '[Product API] Update Product',
  props<{ productDto: EditProductDto, productCode: number }>()
);

export const updateProductSuccess = createAction(
  '[Product API] Update Product Success',
  props<{ newProduct: Product }>()
);

export const updateProductFailure = createAction(
  '[Product API] Update Product Failure',
  props<{ error: any }>()
);
