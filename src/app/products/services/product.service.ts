import { HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Product } from '../models/product';
import { Review } from '../models/review';
import { EditProductDto } from '../models/edit-product-dto';
import { ProductDataService } from './product-data.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productDataService: ProductDataService = inject(ProductDataService);

  deleteProductById(productId: number) {
    this.productDataService.deleteProduct(productId);
  }

  getProductById(id: number): Observable<Product> {
    return this.productDataService.getProductById(id);
  }

  getReviewsByProductId(productId: number): Observable<Review[]> {
    return this.productDataService.getReviewsByProductId(productId);
  }

  getFilteredProducts(params: HttpParams): Observable<Product[]> {
    return this.productDataService.getProductsWithParams(params);
  }

  updateProduct(productDto: EditProductDto, id: number): Observable<Product> {
    return this.productDataService.getProductById(id).pipe(
      tap(productToUpdate => {
        if (productToUpdate) {
          productToUpdate.title = productDto.title || productToUpdate.title;
          productToUpdate.price = productDto.price || productToUpdate.price;
          productToUpdate.description = productDto.description || productToUpdate.description;
          productToUpdate.image = productDto.image || productToUpdate.image;
          productToUpdate.stock = productDto.stock || productToUpdate.stock;
          
          this.productDataService.updateProduct(productToUpdate);
        }
      })
    );
  }
}
