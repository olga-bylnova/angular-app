import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { CartItem } from '../model/cart-item';
import { CartService } from '../service/cart.service';
import { Product } from '../model/product';

@Component({
  selector: 'app-add-to-cart-button',
  standalone: true,
  imports: [],
  templateUrl: './add-to-cart-button.component.html',
  styleUrl: './add-to-cart-button.component.css'
})
export class AddToCartButtonComponent {
  @Input() isDisabled!: boolean;
  productCount: number = 0;
  @Input() cartItem: CartItem | undefined;
  @Input() product!: Product;
  cartService: CartService;

  constructor() {
    this.cartService = inject(CartService);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cartItem'] && changes['cartItem'].currentValue) {
      this.productCount = changes['cartItem'].currentValue.count;
      this.cartItem = changes['cartItem'].currentValue;
    }
  }

  addToCart(event: Event) {
    const addToCartButton = event.target as HTMLInputElement;
    addToCartButton.classList.add('cart-button-invisible');

    const productCountButtons = addToCartButton.nextElementSibling;
    productCountButtons?.classList.add('product-count-section-visible');
  }

  changeProductCount(event: Event) {
    const changeCountButton = event.target as HTMLInputElement;

    if (changeCountButton.classList.contains('minus-button') && this.productCount > 0) {
      this.productCount--;
    } else if (changeCountButton.classList.contains('plus-button')) {
      this.productCount++;
    }

    if (this.productCount !== 0) {
      this.cartService.updateCartItem(this.cartItem, this.product, this.productCount);
    } else {
      if (this.cartItem) {
        this.cartService.deleteCartItem(this.cartItem.id);
      }
    }
  }
}
