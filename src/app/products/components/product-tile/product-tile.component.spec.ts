import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTileComponent } from './product-tile.component';
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { Product } from "../../models/product";
import { deleteProduct } from "../../../store/actions/product.actions";
import { provideRouter, RouterLinkWithHref } from "@angular/router";
import { provideLocationMocks } from "@angular/common/testing";
import { By } from "@angular/platform-browser";
import { AddToCartButtonComponent } from "../add-to-cart-button/add-to-cart-button.component";

describe('ProductTileComponent', () => {
  let component: ProductTileComponent;
  let fixture: ComponentFixture<ProductTileComponent>;
  let store: MockStore;

  const mockProduct: Product = {id: 1, stock: 10};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductTileComponent],
      providers: [
        provideMockStore(),
        provideRouter([]),
        provideLocationMocks(),
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProductTileComponent);
    store = TestBed.inject(MockStore);
    component = fixture.componentInstance;
    component.product = mockProduct;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch delete action on product delete', () => {
    spyOn(store, 'dispatch');
    component.deleteProduct(mockProduct.id);

    expect(store.dispatch).toHaveBeenCalledWith(deleteProduct({productCode: mockProduct.id}));
  });

  it('should disable add to cart button if product is out of stock', () => {
    component.product = {id: 1, stock: 0};
    fixture.detectChanges();

    const addToCartButtonDE = fixture.debugElement.query(By.directive(AddToCartButtonComponent));
    const addToCartComponent = addToCartButtonDE.componentInstance as AddToCartButtonComponent;

    expect(addToCartComponent.isDisabled).toBeTrue();
  });

  it('should enable add to cart button if product is in stock', () => {
    const addToCartButtonDE = fixture.debugElement.query(By.directive(AddToCartButtonComponent));
    const addToCartComponent = addToCartButtonDE.componentInstance as AddToCartButtonComponent;

    expect(addToCartComponent.isDisabled).toBeFalse();
  });

    it('should have correct routerLink to product page', () => {
    const linkDE = fixture.debugElement.query(By.directive(RouterLinkWithHref));
    const routerLink = linkDE.injector.get(RouterLinkWithHref);

    expect(routerLink.href).toContain('/product/1');
  });
});
