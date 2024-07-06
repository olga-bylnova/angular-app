import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: Product[] = [];

  constructor(private http: HttpClient) {
    const url = 'http://localhost:3000/products';
    http.get<Product[]>(url).subscribe(
      data => {
        this.products = data;
      });
  }

  getProducts(): Product[] {
    return this.products;
  }

  deleteProductById(productId : number) {
    let removeIndex = this.products.map(product => product.id).indexOf(productId);
    if (removeIndex !== -1) {
      this.
      products.splice(removeIndex, 1);
    }
  }
}
