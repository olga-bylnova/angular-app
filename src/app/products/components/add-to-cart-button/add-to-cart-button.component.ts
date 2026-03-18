import { Component, inject, Input } from '@angular/core';
import { CartItem } from '../../../cart/models/cart-item';
import { Product } from '../../models/product';
import { CommonModule } from '@angular/common';
import { Store } from "@ngrx/store";
import { CartState } from "../../../store/models/cart.model";
import { createCartItem, deleteCartItem, updateCartItem } from "../../../store/actions/cart.actions";

@Component({
  selector: 'app-add-to-cart-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-to-cart-button.component.html',
  styleUrl: './add-to-cart-button.component.css'
})
export class AddToCartButtonComponent {
  @Input() isDisabled!: boolean;
  @Input() product!: Product;

  private store = inject(Store<CartState>);

  productCount: number = 0;
  isButtonClicked = false;
  private _cartItem: CartItem | undefined | null;

  @Input()
  set cartItem(value: CartItem | undefined | null) {
    this._cartItem = value;
    this.productCount = value ? value.count : 0;
  }

  addToCartButtonClick() {
    this.isButtonClicked = true;
  }

  incrementProductCount() {
    this.productCount++;

    this.updateProductCount();
  }

  decrementProductCount() {
    if (this.productCount > 0) {
      this.productCount--;
    }

    this.updateProductCount();
  }

  private updateProductCount() {
    if (this.productCount !== 0) {
      if (this._cartItem) {
        this.store.dispatch(updateCartItem({ cartItem: this._cartItem, productCount: this.productCount }));
      } else {
        this.store.dispatch(createCartItem({ product: this.product, productCount: this.productCount }));
      }
    } else {
      if (this._cartItem) {
        this.store.dispatch(deleteCartItem({ cartItemId: this._cartItem.id }));
        this.isButtonClicked = false;
        this._cartItem = undefined;
      }
    }
  }
}
