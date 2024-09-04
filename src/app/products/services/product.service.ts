import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, map, Observable } from 'rxjs';
import { Product } from '../models/product';
import { Review } from '../models/review';
import { EditProductDto } from '../models/edit-product-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = [];
  private mainProductsApiUrl = 'http://localhost:3000/products';
  private getReviewsByProductIdApiUrl = 'http://localhost:3000/reviews?productId=';

  private filterQueryParamMap = new Map([
    ['priceFrom', 'price_gte'],
    ['priceTo', 'price_lte'],
    ['ratingFrom', 'rating.rate_gte'],
    ['ratingTo', 'rating.rate_lte']
  ]);

  constructor(private http: HttpClient) {
    http.get<Product[]>(this.mainProductsApiUrl).subscribe(
      data => {
        this.products = data;
      });
  }

  deleteProductById(productId: number) {
    const url = `${this.mainProductsApiUrl}/${productId}`;
    this.http.delete<Product>(url);
  }

  async getProductById(id: number): Promise<Product> {
    const url = `${this.mainProductsApiUrl}/${id}`;
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

    return this.http.get<Product[]>(this.mainProductsApiUrl, { params }).pipe(
      map(products => this.addFiltering(products, filters))
    );
  }

  addFiltering(products: Product[], filters: { [key: string]: string }): Product[] {
    return products.filter(product => {
      if (filters['hasReviews'] === 'true') {
        return product.reviews && product.reviews.length > 0;
      }
      return true;
    });
  }

  updateProduct(productDto: EditProductDto, id: number) {
    let productToUpdate = this.products.find(product => product.id === id);
    if (productToUpdate) {
      productToUpdate.title = productDto.title ?? productToUpdate.title;
      productToUpdate.price = productDto.price ?? productToUpdate.price;
      productToUpdate.description = productDto.description ?? productToUpdate.description;
      productToUpdate.image = productDto.image ?? productToUpdate.image;
      productToUpdate.stock = productDto.stock ?? productToUpdate.stock;

      const url = `${this.mainProductsApiUrl}/${id}`;
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      this.http.put<Product>(url, productToUpdate, httpOptions);
    }
  }
}
