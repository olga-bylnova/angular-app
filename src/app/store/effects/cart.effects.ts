import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, switchMap, catchError, of } from "rxjs";
import { CartService } from "../../cart/services/cart.service";
import {
  createCartItem, createCartItemFailure, createCartItemSuccess,
  deleteCartItem, deleteCartItemFailure,
  deleteCartItemSuccess,
  loadCart,
  loadCartFailure,
  loadCartSuccess, updateCartItem, updateCartItemFailure, updateCartItemSuccess
} from "../actions/cart.actions";

@Injectable()
export class CartEffects {
  private cartService: CartService = inject(CartService);
  private actions$: Actions = inject(Actions);

  loadCart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCart),
      switchMap(() =>
        this.cartService.getCartItems().pipe(
          map((cartItems) => loadCartSuccess({cartItems})),
          catchError((error) =>
            of(loadCartFailure({error}))
          )
        )
      )
    )
  );

  deleteCartItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCartItem),
      switchMap(({cartItemId}) =>
        this.cartService.deleteCartItem(cartItemId).pipe(
          map(() => deleteCartItemSuccess({cartItemId})),
          catchError((error) =>
            of(deleteCartItemFailure({error}))
          )
        )
      )
    )
  );

  createCartItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createCartItem),
      switchMap(({product, productCount}) =>
        this.cartService.createCartItem(product, productCount).pipe(
          map((cartItem) => createCartItemSuccess({cartItem})),
          catchError((error) =>
            of(createCartItemFailure({error}))
          )
        )
      )
    )
  );

  updateCartItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCartItem),
      switchMap(({cartItem, productCount}) =>
        this.cartService.updateCartItem(cartItem, productCount).pipe(
          map((newCartItem) => updateCartItemSuccess({newCartItem})),
          catchError((error) =>
            of(updateCartItemFailure({error}))
          )
        )
      )
    )
  );
}
