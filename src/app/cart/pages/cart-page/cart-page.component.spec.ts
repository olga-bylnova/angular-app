import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartPageComponent } from './cart-page.component';
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { deleteCartItem, loadCart } from "../../../store/actions/cart.actions";
import { selectCartItems } from "../../../store/selectors/cart.selectors";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('CartPageComponent', () => {
  let component: CartPageComponent;
  let fixture: ComponentFixture<CartPageComponent>;
  let store: MockStore;

  const initialState = {
    cart: {
      cartItems: [],
      loading: false,
      error: null,
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartPageComponent, BrowserAnimationsModule],
      providers: [provideMockStore({initialState})]
    })
      .compileComponents();

    fixture = TestBed.createComponent(CartPageComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  afterEach(() => {
    store.resetSelectors();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch loadCart action', () => {
    spyOn(store, 'dispatch');

    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledWith(loadCart());
  });

  it('should dispatch deleteCartItem action', () => {
    spyOn(store, 'dispatch');

    component.deleteCartItem(1);

    expect(store.dispatch).toHaveBeenCalledWith(deleteCartItem({cartItemId: 1}));
  });

  it('should show "No items in the cart" when cart is empty', () => {
    store.overrideSelector(selectCartItems, []);
    store.refreshState();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toBe("No items in the cart");
  });

  it('should render table rows for cart items', () => {
    store.overrideSelector(selectCartItems, [{id: 1, title: 'Product 1', count: 1, price: 10}]);
    store.refreshState();
    fixture.detectChanges();

    let rows = fixture.nativeElement.querySelectorAll('tbody tr');

    expect(rows.length).toBe(1);
  });

  it('should call deleteCartItem when delete button is clicked', () => {
    spyOn(component, 'deleteCartItem');
    store.overrideSelector(selectCartItems, [{id: 1, title: 'Product 1', count: 1, price: 10}]);
    store.refreshState();
    fixture.detectChanges();

    let deleteButton = fixture.nativeElement.querySelector('button');
    deleteButton.click();

    expect(component.deleteCartItem).toHaveBeenCalledWith(1);
  });
});
