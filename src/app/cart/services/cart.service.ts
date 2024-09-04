import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { CartItem } from '../models/cart-item';
import { Product } from '../../products/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private mainCartApiUrl = 'http://localhost:3000/cart';
  private getCartItemByProductIdApiUrl = 'http://localhost:3000/cart?id=';

  constructor(private http: HttpClient) { }

  async getCartItemByProductId(productId: number): Promise<CartItem | undefined> {
    const url = this.getCartItemByProductIdApiUrl + productId;
    const cartItems = await firstValueFrom(this.http.get<CartItem[]>(url));
    return cartItems.length > 0 ? cartItems[0] : undefined;
  }

  updateCartItem(cartItem: CartItem | undefined, product: Product, productCount: number) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    if (cartItem) {
      const url = `${this.mainCartApiUrl}/${cartItem.id}`;
      cartItem.count = productCount;
      this.http.put<CartItem>(url, cartItem, httpOptions);
    } else {
      let newCartItem: CartItem = {
        id: product.id,
        title: product.title,
        count: productCount,
        price: product.price ?? 0
      }
      this.http.post<CartItem>(this.mainCartApiUrl, newCartItem, httpOptions);
    }
  }

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.mainCartApiUrl);
  }

  deleteCartItem(cartItemId: number) : Observable<CartItem> {
    const url = `${this.mainCartApiUrl}/${cartItemId}`;
    return this.http.delete<CartItem>(url);
  }
}
