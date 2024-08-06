import { Component, inject } from '@angular/core';
import { CartService } from '../service/cart.service';
import { CartItem } from '../model/cart-item';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRectangleXmark } from '@fortawesome/free-solid-svg-icons';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
  animations: [
    trigger('rowAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate('500ms ease-out', style({ transform: 'translateX(0)', opacity: 1 }))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ transform: 'translateX(-100%)', opacity: 0 }))
      ])
    ])
  ]
})
export class CartPageComponent {
  cartService: CartService;
  cartItems: CartItem[] = [];
  faRectangleXmark = faRectangleXmark;

  constructor() {
    this.cartService = inject(CartService);
  }

  ngOnInit() {
    this.getCartItems();
  }

  deleteCartItem(cartItemId: number) {
    this.cartService.deleteCartItem(cartItemId).subscribe(
      () => {
        console.log(`Cart item with id ${cartItemId} deleted`);
        this.cartItems = this.cartItems.filter(item => item.id !== cartItemId);
      }
    );
  }

  getCartItems() {
    this.cartService.getCartItems().subscribe(
      data => { this.cartItems = data; }
    );
  }
}
