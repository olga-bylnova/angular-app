import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItem } from '../model/cart-item';
import { firstValueFrom, Observable } from 'rxjs';
import { Product } from '../model/product';

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
      this.http.put<CartItem>(url, cartItem, httpOptions).subscribe(
        updatedCartItem => {
          console.log('Cart item updated:', updatedCartItem);
        }
      );
    } else {
      let newCartItem: CartItem = {
        id: product.id,
        title: product.title,
        count: productCount,
        price: product.price
      }
      this.http.post<CartItem>(this.mainCartApiUrl, newCartItem, httpOptions).subscribe(
        cartItemCreated => {
          console.log('Cart item created:', cartItemCreated);
        }
      );
    }
  }

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.mainCartApiUrl);
  }

  deleteCartItem(cartItemId: number) {
    const url = `${this.mainCartApiUrl}/${cartItemId}`;
    this.http.delete<CartItem>(url).subscribe(
      () => {
        console.log(`Cart item with id ${cartItemId} deleted`);
      }
    );
  }
}
