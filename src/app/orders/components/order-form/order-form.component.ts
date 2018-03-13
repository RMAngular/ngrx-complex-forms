import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Order } from '@state/order/order.model';
import { Customer } from '@state/customer/customer.model';
import { LineItem } from '@state/line-item/line-item.model';
import { Product } from '@state/product/product.model';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent {
  @Input() order: Order;
  @Input() customer: Customer;
  @Input() lineItems: LineItem[];
  @Input() products: Product[];
  @Output() orderChange = new EventEmitter<Order>();

  constructor() {}

  onLineUpdatesChange(lineItems: LineItem[]) {
    console.log(lineItems);
  }
}
