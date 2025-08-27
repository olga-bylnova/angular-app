import { Component, inject, Input } from '@angular/core';
import { CartItem } from '../../../cart/models/cart-item';
import { Product } from '../../models/product';
import { CartService } from '../../../cart/services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-to-cart-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './add-to-cart-button.component.html',
  styleUrl: './add-to-cart-button.component.css'
})
export class AddToCartButtonComponent {
  @Input() isDisabled!: boolean;
  productCount: number = 0;
  _cartItem: CartItem | undefined;
  @Input() product!: Product;
  cartService: CartService;
  isButtonClicked = false;

  constructor() {
    this.cartService = inject(CartService);
  }

  @Input()
  set cartItem(value: CartItem | undefined) {
    this._cartItem = value;
    this.productCount = value ? value.count : 0;
  }

  addToCartButtonClick() {
    this.isButtonClicked = true;
  }

  incrementProductCount() {
    const newProductCount = this.productCount + 1;
    this.updateProductCount(newProductCount);
  }

  decrementProductCount() {
    if (this.productCount > 0) {
      const newProductCount = this.productCount - 1;
      this.updateProductCount(newProductCount);
    }
  }

  updateProductCount(newProductCount: number) {
    if (newProductCount !== 0) {
      if (this._cartItem) {
        this.cartService.updateCartItem(this._cartItem, newProductCount).subscribe(
          () => this.productCount = newProductCount
        );
      } else {
        this.cartService.createCartItem(this.product, newProductCount).subscribe(
          (cartItem) => {
            this._cartItem = cartItem;
            this.productCount = newProductCount;
          }
        );
      }
    } else {
      if (this._cartItem) {
        this.cartService.deleteCartItem(this._cartItem._id).subscribe(
          () => {
            this.productCount = newProductCount;
            this.isButtonClicked = false;
            this._cartItem = undefined;
          }
        );
      }
    }
  }
}
