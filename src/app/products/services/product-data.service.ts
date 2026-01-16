import { inject, Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { Review } from '../models/review';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  private mainProductsApiUrl = 'http://localhost:3000/products';
  private getReviewsByProductIdApiUrl = 'http://localhost:3000/reviews?productId=';

  private http: HttpClient = inject(HttpClient);

  deleteProduct(productId: number): Observable<void> {
    const url = `${this.mainProductsApiUrl}/${productId}`;
    return this.http.delete<void>(url);
  }

  getProductById(id: number): Observable<Product> {
    const url = `${this.mainProductsApiUrl}/${id}`;
    return this.http.get<Product>(url);
  }

  getReviewsByProductId(productId: number): Observable<Review[]> {
    const url = this.getReviewsByProductIdApiUrl + productId;
    return this.http.get<Review[]>(url);
  }

  getProductsWithParams(params: HttpParams): Observable<Product[]> {
    return this.http.get<Product[]>(this.mainProductsApiUrl, { params });
  }

  updateProduct(product: Product): Observable<Product> {
    const url = `${this.mainProductsApiUrl}/${product.id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<Product>(url, product, httpOptions);
  }
}
