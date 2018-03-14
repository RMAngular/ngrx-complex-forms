import { Component, OnInit, Input } from '@angular/core';

import { LineItem } from '@state/line-item/line-item.model';
import { Order } from '@state/order/order.model';
import { Product } from '@state/product/product.model';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  @Input() lineItems: LineItem[];
  @Input() order: Order;
  @Input() products: Product[];

  constructor() {}

  ngOnInit() {}

  calculatedTotal(): number {
    if (!this.lineItems || this.lineItems.length === 0) {
      return 0;
    }
    return this.lineItems
      .map(lineItem => {
        if (!lineItem.quantity) {
          return 0;
        }
        const product = this.products.find(
          product => product.id === lineItem.productId
        );
        if (product === undefined) {
          return 0;
        }
        return lineItem.quantity * product.price;
      })
      .reduce((prev, current) => prev + current);
  }
}
