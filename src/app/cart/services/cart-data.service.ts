import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartDataService {
  private mainCartApiUrl = 'http://localhost:3000/cart';
  private readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getCartItemByProductId(productId: string): Observable<CartItem[]> {
    const url = `${this.mainCartApiUrl}/${productId}`;
    return this.http.get<CartItem[]>(url);
  }

  updateCartItem(cartItem: CartItem): Observable<CartItem> {
    const url = `${this.mainCartApiUrl}/${cartItem._id}`;
    return this.http.put<CartItem>(url, cartItem, this.httpOptions);
  }

  createCartItem(cartItem: CartItem): Observable<CartItem> {
    return this.http.post<CartItem>(this.mainCartApiUrl, cartItem, this.httpOptions);
  }

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.mainCartApiUrl);
  }

  deleteCartItem(cartItemId: string): Observable<CartItem> {
    const url = `${this.mainCartApiUrl}/${cartItemId}`;
    return this.http.delete<CartItem>(url);
  }
}
