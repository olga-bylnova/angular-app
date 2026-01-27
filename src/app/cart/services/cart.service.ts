import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { Product } from '../../products/models/product';
import { CartDataService } from './cart-data.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartDataService: CartDataService = inject(CartDataService);

  getCartItemById(id: number): Observable<CartItem> {
    return this.cartDataService.getCartItemById(id);
  }

  updateCartItem(cartItem: CartItem, productCount: number): Observable<CartItem> {
    let newCartItem: CartItem = {
      ...cartItem,
      count: productCount,
    };
    return this.cartDataService.updateCartItem(newCartItem);
  }

  createCartItem(product: Product, productCount: number): Observable<CartItem> {
    let newCartItem: CartItem = {
      id: product.id,
      title: product.title,
      count: productCount,
      price: product.price ?? 0
    }
    return this.cartDataService.createCartItem(newCartItem);
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartDataService.getCartItems();
  }

  deleteCartItem(cartItemId: number): Observable<void> {
    return this.cartDataService.deleteCartItem(cartItemId);
  }
}
