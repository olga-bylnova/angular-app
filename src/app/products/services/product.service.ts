import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product';
import { Review } from '../models/review';
import { EditProductDto } from '../models/edit-product-dto';
import { ProductDataService } from './product-data.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productDataService: ProductDataService = inject(ProductDataService);

  private filterQueryParamMap = new Map([
    ['priceFrom', 'price_gte'],
    ['priceTo', 'price_lte'],
    ['ratingFrom', 'rating.rate_gte'],
    ['ratingTo', 'rating.rate_lte']
  ]);

  deleteProductById(productId: number) {
    this.productDataService.deleteProduct(productId);
  }

  getProductById(id: number): Observable<Product> {
    return this.productDataService.getProductById(id);
  }

  getReviewsByProductId(productId: number): Observable<Review[]> {
    return this.productDataService.getReviewsByProductId(productId);
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

    return this.productDataService.getProductsWithParams(params).pipe(
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
    this.productDataService.getProductById(id).subscribe(productToUpdate => {
      if (productToUpdate) {
        productToUpdate.title = productDto.title ?? productToUpdate.title;
        productToUpdate.price = productDto.price ?? productToUpdate.price;
        productToUpdate.description = productDto.description ?? productToUpdate.description;
        productToUpdate.image = productDto.image ?? productToUpdate.image;
        productToUpdate.stock = productDto.stock ?? productToUpdate.stock;

        this.productDataService.updateProduct(productToUpdate);
      }
    });
  }
}
