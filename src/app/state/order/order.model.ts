import { Customer } from '@state/customer/customer.model';
import { Product } from '@state/product/product.model';
import { LineItem } from '../line-item/line-item.model';

export interface Order {
  id?: number;
  customerId: number;
  lineItemIds: number[];
}

export interface OrderView {
  order: Order;
  customer: Customer;
  lineItems: LineItem[];
  products: Product[];
}
