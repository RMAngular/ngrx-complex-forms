import { LineItem } from '../line-item/line-item.model';
import { Customer } from '@state/customer/customer.model';
import { Product } from '@state/product/product.model';

export interface Order {
  id: string;
  customerId: string;
  lineItemIds: string[];
}

export interface OrderView {
  order: Order;
  customer: Customer;
  lineItems: LineItem[];
  products: Product[];
}
