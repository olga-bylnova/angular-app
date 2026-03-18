import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { loadCart } from "../../../store/actions/cart.actions";
import { ActivatedRoute, Router } from "@angular/router";
import { of } from "rxjs";
import { Component, Input } from "@angular/core";
import { FilterService } from "../../services/filter.service";
import { FilterComponent } from "../../components/filter/filter.component";
import { loadProducts } from "../../../store/actions/product.actions";
import { selectCartItems } from "../../../store/selectors/cart.selectors";
import { selectProducts } from "../../../store/selectors/product.selectors";
import { ProductTileComponent } from "../../components/product-tile/product-tile.component";
import { Product } from "../../models/product";
import { CartItem } from "../../../cart/models/cart-item";

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let store: MockStore;
  let mockFilterService = jasmine.createSpyObj<FilterService>(
    'FilterService',
    ['getFormUpdateValue', 'initializeForm']
  );
  let routerMock = {navigate: jasmine.createSpy('navigate')};

  const mockRoute = {queryParams: of({priceFrom: "3", priceTo: "10"})};
  const mockCartItem = {id: 1, title: 'Product 1', count: 1, price: 10};

  @Component({
    selector: 'app-filter',
    template: '',
    standalone: true,
  })
  class MockFilterComponent {
    filterForm = {
      patchValue: jasmine.createSpy('patchValue')
    };
  }

  @Component({
    selector: 'app-product-tile',
    template: '',
    standalone: true,
  })
  class MockProductTileComponent {
    @Input() product!: Product;
    @Input() cartItem: CartItem | undefined | null;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        provideMockStore({}),
        {provide: ActivatedRoute, useValue: mockRoute},
        {provide: FilterService, useValue: mockFilterService},
        {provide: Router, useValue: routerMock},
      ],
    })
      .overrideComponent(HomeComponent, {
        remove: {
          imports: [FilterComponent, ProductTileComponent]
        },
        add: {
          imports: [MockFilterComponent, MockProductTileComponent]
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    mockFilterService.getFormUpdateValue.and.returnValue({});

    store.overrideSelector(selectProducts, [{id: 1}, {id: 2}]);
    store.refreshState();

    fixture.detectChanges();
  });

  afterEach(() => {
    store.resetSelectors();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch load cart action', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledWith(loadCart());
  });

  it('should dispatch loadProducts with queryParams', () => {
    spyOn(store, 'dispatch');
    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledWith(
      loadProducts({filters: {priceFrom: "3", priceTo: "10"}})
    );
  });

  it('should patch filter form when queryParams change', () => {
    component.ngOnInit();
    fixture.detectChanges();

    expect(component.filterComponent.filterForm.patchValue).toHaveBeenCalled();
  });

  it('should return cart item by product id', () => {
    store.overrideSelector(selectCartItems, [mockCartItem]);
    store.refreshState();
    fixture.detectChanges();

    component.getCartItem(1)
      .subscribe(cartItem => expect(cartItem).toEqual(mockCartItem));
  });

  it('should return no cart item if cart is empty', () => {
    store.overrideSelector(selectCartItems, []);
    store.refreshState();
    fixture.detectChanges();

    component.getCartItem(1)
      .subscribe(cartItem => expect(cartItem).toBeUndefined());
  });

  it('should remove filter by key and navigate', fakeAsync(() => {
    routerMock.navigate.and.returnValue(Promise.resolve(true));
    component.removeFilter("priceFrom");

    tick();

    expect(routerMock.navigate).toHaveBeenCalledWith([], {queryParams: {priceTo: "10"}});
    expect(component.filters).toEqual({priceTo: "10"});
  }));

  it('should return filter keys', () => {
    component.filters = {priceFrom: "3", priceTo: "100"};

    expect(component.filterKeys).toEqual(['priceFrom', 'priceTo']);
  });

  it('should render product count', fakeAsync(() => {
    expect(fixture.nativeElement.querySelector('.product-count').textContent)
      .toContain('2 products were found');
  }));
});
