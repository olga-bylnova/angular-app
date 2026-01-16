import { CartItem } from "../../cart/models/cart-item";

export interface CartState {
  cartItems: CartItem[];
  loading: boolean;
  error: any;
}
