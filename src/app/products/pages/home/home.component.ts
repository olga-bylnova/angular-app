import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { ProductTileComponent } from '../../components/product-tile/product-tile.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterComponent } from '../../components/filter/filter.component';
import { ProductService } from '../../services/product.service';
import { FilterService } from '../../services/filter.service';
import { HttpParams } from '@angular/common/http';
import { FILTERS } from '../../util/filters.constants';
import { CartService } from '../../../cart/services/cart.service';
import { CartItem } from '../../../cart/models/cart-item';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductTileComponent, CommonModule, FilterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  productService: ProductService = inject(ProductService);
  cartService: CartService = inject(CartService);
  filterService: FilterService = inject(FilterService);
  @ViewChild(FilterComponent) filterComponent!: FilterComponent;
  products: Product[] = [];
  filters: any = {};
  cartItems: CartItem[] | undefined;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(data => {
      this.cartItems = data;
    });

    this.route.queryParams.subscribe(params => {
      this.filters = params;
      this.loadProducts();
      if (this.filterComponent) {
        this.filterComponent.filterForm.patchValue(this.filterService.getFormUpdateValue());
      }
    });
  }

  loadProducts() {
    this.productService.getFilteredProducts(this.getRequestParams(this.filters)).subscribe(products => {
      this.products = products;
    });
  }

  removeFilter(key: string) {
    const updatedFilters = { ...this.filters };
    delete updatedFilters[key];
    this.router.navigate([], {
      queryParams: updatedFilters
    }).then(() => {
      this.filters = updatedFilters;
      this.filterComponent.filterForm.patchValue(this.filterService.getFormUpdateValue());
    });
  }

  getRequestParams(filters: { [key: string]: string }): HttpParams {
    let params = new HttpParams();
    Object.keys(filters).forEach(key => {
      const value = filters[key];
      const filter = FILTERS.get(key);

      if (filter && value) {
        if (value === 'true') {
          params = params.append(filter.requestQueryParam, '0');
        } else {
          params = params.append(filter.requestQueryParam, value);
        }
      }
    });
    return params;
  }

  get filterKeys() {
    return Object.keys(this.filters);
  }

  getCartItem(productId: Number): CartItem | undefined {
    return this.cartItems?.find(cartItem => cartItem.id === productId);
  }

  onProductDeleted() {
    this.loadProducts();
  }
}
