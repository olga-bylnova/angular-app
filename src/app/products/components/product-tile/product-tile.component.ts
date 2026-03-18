import { Component, inject, Input } from '@angular/core';
import { Product } from '../../models/product';
import { AddToCartButtonComponent } from '../add-to-cart-button/add-to-cart-button.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faStar, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';
import { CartItem } from '../../../cart/models/cart-item';
import { CommonModule } from '@angular/common';
import { Store } from "@ngrx/store";
import { ProductState } from "../../../store/models/product.model";
import { deleteProduct } from "../../../store/actions/product.actions";

@Component({
  selector: 'app-product-tile',
  standalone: true,
  imports: [AddToCartButtonComponent, FontAwesomeModule, RouterModule, CommonModule],
  templateUrl: './product-tile.component.html',
  styleUrl: './product-tile.component.css'
})
export class ProductTileComponent {
  @Input() product!: Product;
  @Input() cartItem: CartItem | undefined | null;
  faStar = faStar;
  faDollarSign = faDollarSign;
  store = inject(Store<ProductState>);

  deleteProduct(productId: number) {
    this.store.dispatch(deleteProduct({productCode: productId}));
  }
}
