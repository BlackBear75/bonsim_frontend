import {Product} from './product.model';

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
  price: number;
}
