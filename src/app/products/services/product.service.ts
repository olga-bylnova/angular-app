import { inject, Injectable } from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { Product } from '../models/product';
import { Review } from '../models/review';
import { EditProductDto } from '../models/edit-product-dto';
import { ProductDataService } from './product-data.service';
import { FILTERS } from "../util/filters.constants";
import { HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productDataService: ProductDataService = inject(ProductDataService);

  deleteProductById(productId: number): Observable<void> {
    return this.productDataService.deleteProduct(productId);
  }

  getProductById(id: number): Observable<Product> {
    return this.productDataService.getProductById(id);
  }

  getReviewsByProductId(productId: number): Observable<Review[]> {
    return this.productDataService.getReviewsByProductId(productId);
  }

  getFilteredProducts(filters: { [key: string]: string }): Observable<Product[]> {
    const httpParams = this.getRequestParams(filters);
    return this.productDataService.getProductsWithParams(httpParams);
  }

  updateProduct(productDto: EditProductDto, id: number): Observable<Product | null> {
    return this.productDataService.getProductById(id).pipe(
      switchMap(productToUpdate => {
        if (!productToUpdate) {
          return of(null);
        } else {
          productToUpdate.title = productDto.title || productToUpdate.title;
          productToUpdate.price = productDto.price || productToUpdate.price;
          productToUpdate.description = productDto.description || productToUpdate.description;
          productToUpdate.image = productDto.image || productToUpdate.image;
          productToUpdate.stock = productDto.stock || productToUpdate.stock;

          return this.productDataService.updateProduct(productToUpdate);
        }
      })
    );
  }

  private getRequestParams(filters: { [key: string]: string }): HttpParams {
    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      const value = filters[key];
      const filter = FILTERS.get(key);

      if (filter && value) {
        if (value === 'true') {
          params = params.append(filter.requestQueryParam, '0');
        } else {
          params = params.append(filter.requestQueryParam, value);
        }
      }
    });
    return params;
  }
}
