import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { Product } from '../model/product';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { AddToCartButtonComponent } from '../add-to-cart-button/add-to-cart-button.component';
import { StockLabelDirective } from '../directive/stock-label.directive';
import { CommonModule } from '@angular/common';
import { Review } from '../model/review';
import { CustomerReviewComponent } from '../customer-review/customer-review.component';

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
