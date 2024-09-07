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
import { Observable, tap } from 'rxjs';

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
  product$: Observable<Product>;
  reviews$: Observable<Review[]>;
  isOutOfStock: boolean = false;
  faStar = faStar;
  faDollarSign = faDollarSign;

  constructor() {
    const productId = Number(this.route.snapshot.params['id']);
    this.product$ = this.productService.getProductById(productId).pipe(
      tap(product => {
        this.isOutOfStock = product.stock === 0;
      })
    );
    this.reviews$ = this.productService.getReviewsByProductId(productId);
  }
}
