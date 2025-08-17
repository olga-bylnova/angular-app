import {HttpParams} from '@angular/common/http';
import {inject, Injectable} from '@angular/core';
import {Observable, of, switchMap} from 'rxjs';
import {Product} from '../models/product';
import {Review} from '../models/review';
import {EditProductDto} from '../models/edit-product-dto';
import {ProductDataService} from './product-data.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productDataService: ProductDataService = inject(ProductDataService);

  deleteProductById(productId: string): Observable<Product> {
    return this.productDataService.deleteProduct(productId);
  }

  getProductById(id: string): Observable<Product> {
    return this.productDataService.getProductById(id);
  }

  getReviewsByProductId(productId: string): Observable<Review[]> {
    return this.productDataService.getReviewsByProductId(productId);
  }

  getFilteredProducts(params: HttpParams): Observable<Product[]> {
    return this.productDataService.getProductsWithParams(params);
  }

  updateProduct(productDto: EditProductDto, id: string): Observable<Product | null> {
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
}
