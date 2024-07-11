import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { firstValueFrom, map, Observable } from 'rxjs';
import { Review } from '../model/review';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = [];
  private getProductsApiUrl = 'http://localhost:3000/products';
  private getReviewsByProductIdApiUrl = 'http://localhost:3000/reviews?productId=';

  private filterQueryParamMap = new Map([
    ['priceFrom', 'price_gte'],
    ['priceTo', 'price_lte'],
    ['ratingFrom', 'rating.rate_gte'],
    ['ratingTo', 'rating.rate_lte']
  ]);

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

  getFilteredProducts(filters: { [key: string]: string }): Observable<Product[]> {
    let params = new HttpParams();
    let filterArray = Object.entries(filters);
    
    for (let [key, value] of filterArray) {
      if (value && this.filterQueryParamMap.has(key)) {
        let mapValue = this.filterQueryParamMap.get(key) || '';
        params = params.append(mapValue, value + '');
      }
    }

    if (filters['inStock'] === 'true') {
      params = params.append('stock_ne', 0);
    }
    params = params.append('_embed', 'reviews');

    return this.http.get<Product[]>(this.getProductsApiUrl, { params }).pipe(
      map(products => this.additionalFiltering(products, filters))
    );
  }

  additionalFiltering(products: Product[], filters: { [key: string]: string }): Product[] {
    return products.filter(product => {
      if (filters['hasReviews'] === 'true') {
        return product.reviews.length > 0;
      }
      return true;
    });
  }
}
