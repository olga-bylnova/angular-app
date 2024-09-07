import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { Product } from '../../products/models/product';
import { CartDataService } from './cart-data.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartDataService: CartDataService = inject(CartDataService);

  getCartItemByProductId(productId: number): Observable<CartItem | null> {
    return this.cartDataService.getCartItemByProductId(productId)
      .pipe(
        map(cartItems => cartItems.length > 0 ? cartItems[0] : null)
      );
  }

  updateCartItem(cartItem: CartItem, productCount: number) {
    cartItem.count = productCount;
    this.cartDataService.updateCartItem(cartItem).subscribe();
  }

  createCartItem(product: Product, productCount: number): CartItem {
    let newCartItem: CartItem = {
      id: product.id,
      title: product.title,
      count: productCount,
      price: product.price ?? 0
    }
    this.cartDataService.createCartItem(newCartItem).subscribe();
    return newCartItem;
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartDataService.getCartItems();
  }

  deleteCartItem(cartItemId: number) {
    this.cartDataService.deleteCartItem(cartItemId).subscribe();
  }
}
