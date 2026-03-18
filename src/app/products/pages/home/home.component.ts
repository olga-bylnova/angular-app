import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { ProductTileComponent } from '../../components/product-tile/product-tile.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterComponent } from '../../components/filter/filter.component';
import { FilterService } from '../../services/filter.service';
import { CartItem } from '../../../cart/models/cart-item';
import { ProductState } from "../../../store/models/product.model";
import { loadProducts } from "../../../store/actions/product.actions";
import { map, Observable } from "rxjs";
import { selectProducts } from "../../../store/selectors/product.selectors";
import { Store } from "@ngrx/store";
import { selectCartItems } from "../../../store/selectors/cart.selectors";
import { loadCart } from "../../../store/actions/cart.actions";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductTileComponent, CommonModule, FilterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  private filterService: FilterService = inject(FilterService);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private router: Router = inject(Router);
  private store = inject(Store<ProductState>);

  @ViewChild('filterRef') filterComponent!: FilterComponent;

  filters: any = {};
  cartItems$: Observable<CartItem[]> = this.store.select(selectCartItems);
  products$: Observable<Product[]> = this.store.select(selectProducts);

  ngOnInit(): void {
    this.store.dispatch(loadCart());

    this.route.queryParams.subscribe(params => {
      this.filters = params;
      this.store.dispatch(
        loadProducts({filters: this.filters})
      );
      if (this.filterComponent) {
        this.filterComponent.filterForm.patchValue(this.filterService.getFormUpdateValue());
      }
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

  get filterKeys() {
    return Object.keys(this.filters);
  }

  getCartItem(productId: Number): Observable<CartItem | undefined> {
    return this.cartItems$.pipe(
      map(items => items.find(item => item.id === productId))
    );
  }
}
