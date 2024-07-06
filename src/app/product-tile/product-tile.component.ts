import { Component, inject, Input } from '@angular/core';
import { Product } from '../model/product';
import { AddToCartButtonComponent } from '../add-to-cart-button/add-to-cart-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-product-tile',
  standalone: true,
  imports: [AddToCartButtonComponent, FontAwesomeModule],
  templateUrl: './product-tile.component.html',
  styleUrl: './product-tile.component.css'
})
export class ProductTileComponent {
  productService: ProductService;

  constructor() {
    this.productService = inject(ProductService);
  }

  deleteProduct(productId: number) {
    this.productService.deleteProductById(productId);
  }

  @Input() product!: Product;
  faStar = faStar;
  faDollarSign = faDollarSign;
}