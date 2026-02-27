import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToCartButtonComponent } from './add-to-cart-button.component';
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { createCartItem, deleteCartItem, updateCartItem } from "../../../store/actions/cart.actions";

describe('AddToCartButtonComponent', () => {
  let component: AddToCartButtonComponent;
  let fixture: ComponentFixture<AddToCartButtonComponent>;
  let store: MockStore;

  const mockCartItem = {id: 1, count: 1, price: 1};
  const mockProduct = {id: 1, title: 'Test product'};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddToCartButtonComponent],
      providers: [provideMockStore({})]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddToCartButtonComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set isButtonClicked to true after add to cart button is clicked', () => {
    component.addToCartButtonClick();

    expect(component.isButtonClicked).toBe(true);
  });

  it('should increment product count', () => {
    component.productCount = 0;
    component.incrementProductCount();

    expect(component.productCount).toBe(1);
  });

  it('should decrement product count if it is more than 0', () => {
    component.productCount = 1;
    component.decrementProductCount();

    expect(component.productCount).toBe(0);
  });

  it('should update product count when cartItem is set', () => {
    component.cartItem = mockCartItem;

    expect(component.productCount).toBe(1);
  });

  it('should not update product count when cartItem is not set', () => {
    component.cartItem = null;

    expect(component.productCount).toBe(0);
  });

  it('should update cart item when product count is changed', () => {
    spyOn(store, 'dispatch');
    component.cartItem = mockCartItem;
    component.incrementProductCount();

    expect(store.dispatch).toHaveBeenCalledWith(updateCartItem({cartItem: mockCartItem, productCount: 2}));
  });

  it('should create cart item when product count is changed without cart item', () => {
    spyOn(store, 'dispatch');
    component.cartItem = null;
    component.product = mockProduct;
    component.incrementProductCount();

    expect(store.dispatch).toHaveBeenCalledWith(createCartItem({product: mockProduct, productCount: 1}));
  });

  it('should delete cart item when product count is decremented to 0', () => {
    spyOn(store, 'dispatch');
    component.cartItem = mockCartItem;
    component.decrementProductCount();

    expect(store.dispatch).toHaveBeenCalledWith(deleteCartItem({cartItemId: mockCartItem.id}));
  });

  it('should disable add to cart button when isDisabled is true', () => {
    component.isDisabled = true;
    fixture.detectChanges();

    const addToCartButton = fixture.nativeElement.querySelectorAll('button')[0];
    expect(addToCartButton.disabled).toBe(true);
  });

  it('should show counter section when productCount > 0', () => {
    component.productCount = 2;
    fixture.detectChanges();

    const productCountSection = fixture.nativeElement.querySelector('.product-count-section');
    expect(productCountSection).toBeTruthy();
  });
});
