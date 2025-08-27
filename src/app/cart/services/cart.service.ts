import {inject, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CartItem} from '../models/cart-item';
import {Product} from '../../products/models/product';
import {CartDataService} from './cart-data.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartDataService: CartDataService = inject(CartDataService);

  getCartItemByProductId(productId: string): Observable<CartItem> {
    return this.cartDataService.getCartItemByProductId(productId);
  }

  updateCartItem(cartItem: CartItem, productCount: number): Observable<CartItem> {
    cartItem.count = productCount;
    return this.cartDataService.updateCartItem(cartItem);
  }

  createCartItem(product: Product, productCount: number): Observable<CartItem> {
    let newCartItem: CartItem = {
      _id: product._id,
      title: product.title,
      count: productCount,
      price: product.price ?? 0
    }
    return this.cartDataService.createCartItem(newCartItem);
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartDataService.getCartItems();
  }

  deleteCartItem(cartItemId: string): Observable<CartItem> {
    return this.cartDataService.deleteCartItem(cartItemId);
  }
}
