import { Component, inject, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product';
import { ProductTileComponent } from '../../components/product-tile/product-tile.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FilterComponent } from '../../components/filter/filter.component';
import { ProductService } from '../../services/product.service';
import { FilterService } from '../../services/filter.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductTileComponent, CommonModule, FilterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  productService: ProductService = inject(ProductService);
  filterService: FilterService = inject(FilterService);
  @ViewChild(FilterComponent) filterComponent!: FilterComponent;
  products: Product[] = [];
  filters: any = {};

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.filters = params;
      this.loadProducts();
    });
  }

  loadProducts() {
    this.productService.getFilteredProducts(this.filters).subscribe(products => {
      this.products = products;
    });
  }

  removeFilter(key: string) {
    const updatedFilters = { ...this.filters };
    updatedFilters[key] = '';
    this.router.navigate([], {
      queryParams: updatedFilters,
      queryParamsHandling: 'merge'
    }).then(() => {
      this.filters = updatedFilters;
      this.filterService.initializeForm(this.filterComponent.filterForm);
    });
  }

  get filterKeys() {
    return Object.keys(this.filters);
  }

  onProductDeleted() {
    this.loadProducts();
  }
}
