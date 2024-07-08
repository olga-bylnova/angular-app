import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { firstValueFrom } from 'rxjs';
import { Review } from '../model/review';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = [];
  private getProductsApiUrl = 'http://localhost:3000/products';
  private getReviewsByProductIdApiUrl = 'http://localhost:3000/reviews?productId=';

  constructor(private http: HttpClient) {
    http.get<Product[]>(this.getProductsApiUrl).subscribe(
      data => {
        this.products = data;
      });
  }

  getProducts(): Product[] {
    return this.products;
  }

  deleteProductById(productId: number) {
    let removeIndex = this.products.map(product => product.id).indexOf(productId);
    if (removeIndex !== -1) {
      this.
        products.splice(removeIndex, 1);
    }
  }

  async getProductById(id: number): Promise<Product> {
    const url = `${this.getProductsApiUrl}/${id}`;
    return firstValueFrom(this.http.get<Product>(url));
  }

  async getReviewsByProductId(productId: number): Promise<Review[]> {
    const url = this.getReviewsByProductIdApiUrl + productId;
    return firstValueFrom(this.http.get<Review[]>(url));
  }
}
