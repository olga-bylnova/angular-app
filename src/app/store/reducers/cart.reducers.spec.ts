import { cartReducer } from "./cart.reducers";
import {
  createCartItemSuccess,
  deleteCartItemSuccess,
  loadCart,
  updateCartItemSuccess
} from "../actions/cart.actions";

describe('CartReducer', () => {
  const initialState = {
    cartItems: [],
    loading: false,
    error: null,
  };

  const mockCartItems = [
    {id: 1, title: 'Cart Item 1', count: 1, price: 10},
    {id: 2, title: 'Cart Item 2', count: 1, price: 10},
  ];
  const mockNewCartItem = {id: 3, title: 'Cart Item 3', count: 1, price: 10};
  const mockUpdatedCartItem = {id: 2, title: 'New title', count: 1, price: 10};

  it('should return initial state', () => {
    const action = {type: 'Unknown'} as any;
    const state = cartReducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('should set loading true on loadCart', () => {
    const state = cartReducer(initialState, loadCart());

    expect(state).toEqual({
      cartItems: [],
      loading: true,
      error: null,
    });
  });

  it('should remove item on deleteCartItemSuccess', () => {
    const startState = {...initialState, cartItems: mockCartItems};
    const state = cartReducer(startState, deleteCartItemSuccess({cartItemId: 1}));

    expect(state.cartItems.length).toBe(1);
    expect(state.cartItems[0].id).toBe(2);
  });

  it('should add item on createCartItemSuccess', () => {
    const startState = {...initialState, cartItems: mockCartItems};
    const state = cartReducer(startState, createCartItemSuccess({cartItem: mockNewCartItem}));

    expect(state.cartItems.length).toBe(3);
    expect(state.cartItems[2].id).toBe(3);
  });

  it('should update item on updateCartItemSuccess', () => {
    const startState = {...initialState, cartItems: mockCartItems};
    const state = cartReducer(startState, updateCartItemSuccess({newCartItem: mockUpdatedCartItem}));

    expect(state.cartItems.length).toBe(2);
    expect(state.cartItems[1].title).toBe("New title");
  });
});
