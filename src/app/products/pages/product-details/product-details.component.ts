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
  product: Product | undefined;
  reviews: Review[] = [];
  isOutOfStock: boolean = false;
  faStar = faStar;
  faDollarSign = faDollarSign;

  async ngOnInit() {
    const productId = Number(this.route.snapshot.params['id']);
    await this.getProduct(productId);
    this.reviews = await this.productService.getReviewsByProductId(productId);
  }

  async getProduct(productId: number) {
    this.product = await this.productService.getProductById(productId);
    this.isOutOfStock = this.product.stock === 0;
  }
}
