import { Component, EventEmitter, inject, Input, Output, SimpleChanges } from '@angular/core';
import { Product } from '../../models/product';
import { AddToCartButtonComponent } from '../add-to-cart-button/add-to-cart-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';
import { CartItem } from '../../../cart/models/cart-item';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../../cart/services/cart.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-tile',
  standalone: true,
  imports: [AddToCartButtonComponent, FontAwesomeModule, RouterModule, CommonModule],
  templateUrl: './product-tile.component.html',
  styleUrl: './product-tile.component.css'
})
export class ProductTileComponent {
  productService: ProductService;
  cartService: CartService;
  @Input() product!: Product;
  @Output() productDeleted = new EventEmitter<number>();
  cartItem$: Observable<CartItem | null> = of(null);
  faStar = faStar;
  faDollarSign = faDollarSign;

  constructor() {
    this.productService = inject(ProductService);
    this.cartService = inject(CartService);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'] && this.product) {
      this.cartItem$ = this.cartService.getCartItemByProductId(this.product.id);
    }
  }

  deleteProduct(productId: number) {
    this.productService.deleteProductById(productId);
    this.productDeleted.emit();
  }
}