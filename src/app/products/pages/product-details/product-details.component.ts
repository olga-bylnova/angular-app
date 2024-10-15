import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { AddToCartButtonComponent } from '../../components/add-to-cart-button/add-to-cart-button.component';
import { StockLabelDirective } from '../../../shared/directives/stock-label.directive';
import { CommonModule } from '@angular/common';
import { Review } from '../../models/review';
import { ProductService } from '../../services/product.service';
import { CustomerReviewComponent } from '../../components/customer-review/customer-review.component';
import { EMPTY, Observable, tap } from 'rxjs';
import { CartService } from '../../../cart/services/cart.service';
import { CartItem } from '../../../cart/models/cart-item';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [FontAwesomeModule, AddToCartButtonComponent, StockLabelDirective, CommonModule, CustomerReviewComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  productService: ProductService = inject(ProductService);
  cartService: CartService = inject(CartService);
  product$: Observable<Product> = EMPTY;
  reviews$: Observable<Review[]> = EMPTY;
  cartItem: CartItem | undefined;
  isOutOfStock: boolean = false;
  faStar = faStar;
  faDollarSign = faDollarSign;

  ngOnInit() {
    const productId = Number(this.route.snapshot.params['id']);
    if (!isNaN(productId)) {
      this.product$ = this.productService.getProductById(productId).pipe(
        tap(product => {
          this.isOutOfStock = !product.stock;

          this.cartService.getCartItemByProductId(product.id).subscribe(data => {
            this.cartItem = data;
          });
        })
      );
      this.reviews$ = this.productService.getReviewsByProductId(productId);
    }
  }
}
