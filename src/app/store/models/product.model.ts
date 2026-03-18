import { Product } from "../../products/models/product";

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: any;
}
