import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import {
  deleteProduct,
  deleteProductFailure, deleteProductSuccess,
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess, updateProduct, updateProductFailure, updateProductSuccess
} from "../actions/product.actions";
import { map, switchMap, catchError, of, tap } from "rxjs";
import { ProductService } from "../../products/services/product.service";
import { Router } from "@angular/router";

@Injectable()
export class ProductEffects {
  private productService: ProductService = inject(ProductService);
  private router: Router = inject(Router);
  private actions$: Actions = inject(Actions);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      switchMap(({filters}) =>
        this.productService.getFilteredProducts(filters).pipe(
          map((products) => loadProductsSuccess({products})),
          catchError((error) =>
            of(loadProductsFailure({error}))
          )
        )
      )
    )
  );

  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct),
      switchMap(({productCode}) =>
        this.productService.deleteProductById(productCode).pipe(
          map(() => deleteProductSuccess({productCode})),
          catchError((error) =>
            of(deleteProductFailure({error}))
          )
        )
      )
    )
  );

  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProduct),
      switchMap(({productDto, productCode}) =>
        this.productService.updateProduct(productDto, productCode).pipe(
          map((newProduct) => {
            if (newProduct) {
              return updateProductSuccess({newProduct});
            } else {
              return updateProductFailure({error: 'Product not found'});
            }
          }),
          catchError((error) =>
            of(updateProductFailure({error}))
          )
        )
      )
    )
  );

  updateProductSuccess$ = createEffect(() =>
      this.actions$.pipe(
        ofType(updateProductSuccess),
        tap(() => this.router.navigate(['']))
      ),
    {dispatch: false}
  );
}
