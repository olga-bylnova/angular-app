import { productReducer } from "./product.reducers";
import { deleteProductSuccess, loadProducts, updateProductSuccess } from "../actions/product.actions";

describe('ProductReducer', () => {
  const initialState = {
    products: [],
    loading: false,
    error: null,
  };

  const mockProducts = [
    {id: 1, title: 'Product 1'},
    {id: 2, title: 'Product 2'},
  ];
  const mockUpdatedProduct = {id: 2, title: 'New title'};

  it('should return initial state', () => {
    const action = {type: 'Unknown'} as any;
    const state = productReducer(initialState, action);

    expect(state).toBe(initialState);
  });

  it('should set loading true on loadProducts', () => {
    const state = productReducer(initialState, loadProducts({filters: {}}));

    expect(state).toEqual({
      products: [],
      loading: true,
      error: null,
    });
  });

  it('should remove item on deleteProductSuccess', () => {
    const startState = {...initialState, products: mockProducts};
    const state = productReducer(startState, deleteProductSuccess({productCode: 1}));

    expect(state.products.length).toBe(1);
    expect(state.products[0].id).toBe(2);
  });

  it('should update item on updateProductSuccess', () => {
    const startState = {...initialState, products: mockProducts};
    const state = productReducer(startState, updateProductSuccess({newProduct: mockUpdatedProduct}));

    expect(state.products.length).toBe(2);
    expect(state.products[1].title).toBe("New title");
  });
});
