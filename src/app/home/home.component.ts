import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product';
import { ProductTileComponent } from '../product-tile/product-tile.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductTileComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  productService: ProductService = inject(ProductService);
  products: Product[] = [];

  constructor() {
    this.products = this.productService.getProducts();
  }
}
