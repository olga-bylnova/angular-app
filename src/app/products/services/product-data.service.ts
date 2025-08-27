import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { Review } from '../models/review';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {
  private mainProductsApiUrl = `${environment.apiUrl}/products`;
  private getReviewsByProductIdApiUrl = `${environment.apiUrl}/reviews?productId=`;

  constructor(private http: HttpClient) { }

  deleteProduct(productId: string): Observable<Product> {
    const url = `${this.mainProductsApiUrl}/${productId}`;
    return this.http.delete<Product>(url);
  }

  getProductById(id: string): Observable<Product> {
    const url = `${this.mainProductsApiUrl}/${id}`;
    return this.http.get<Product>(url);
  }

  getReviewsByProductId(productId: string): Observable<Review[]> {
    const url = this.getReviewsByProductIdApiUrl + productId;
    return this.http.get<Review[]>(url);
  }

  getProductsWithParams(params: HttpParams): Observable<Product[]> {
    return this.http.get<Product[]>(this.mainProductsApiUrl, { params });
  }

  updateProduct(product: Product): Observable<Product> {
    const url = `${this.mainProductsApiUrl}/${product._id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.put<Product>(url, product, httpOptions);
  }
}
