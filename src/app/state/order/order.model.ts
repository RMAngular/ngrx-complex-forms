import { LineItem } from '../line-item/line-item.model';

export interface Order {
  id: string;
  customerId: string;
  lineItemIds: string[];
}
