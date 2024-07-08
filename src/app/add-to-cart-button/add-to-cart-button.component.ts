import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-add-to-cart-button',
  standalone: true,
  imports: [],
  templateUrl: './add-to-cart-button.component.html',
  styleUrl: './add-to-cart-button.component.css'
})
export class AddToCartButtonComponent {
  productCount: number = 0;
  @Input() isDisabled! : boolean;

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
  }
}
