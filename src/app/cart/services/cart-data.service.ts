import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartDataService {
  private mainCartApiUrl = 'http://localhost:3000/cart';
  private getCartItemByProductIdApiUrl = 'http://localhost:3000/cart?id=';
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getCartItemByProductId(productId: number): Observable<CartItem[]> {
    const url = this.getCartItemByProductIdApiUrl + productId;
    return this.http.get<CartItem[]>(url);
  }

  updateCartItem(cartItem: CartItem): Observable<CartItem> {
    const url = `${this.mainCartApiUrl}/${cartItem.id}`;
    return this.http.put<CartItem>(url, cartItem, this.httpOptions);
  }

  createCartItem(cartItem: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(this.mainCartApiUrl, cartItem, this.httpOptions);
  }

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.mainCartApiUrl);
  }

  deleteCartItem(cartItemId: number): Observable<CartItem> {
    const url = `${this.mainCartApiUrl}/${cartItemId}`;
    return this.http.delete<CartItem>(url);
  }
}
