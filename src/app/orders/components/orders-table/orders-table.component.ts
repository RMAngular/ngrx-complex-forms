import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { OrderView, Order } from '@state/order/order.model';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit {
  displayedColumns = ['id', 'customer', 'total'];
  @Input() ordersView: Array<OrderView>;
  @Input() selectedOrderId: string;
  @Output() orderClicked = new EventEmitter<Order>();

  constructor() { }

  ngOnInit() { }

  computeOrderTotal(order: Order): number {
    return 0;
    // return order.lineItems
    //   .map(lineItem => lineItem.price)
    //   .reduce((prev, current) => prev + current);
  }

  isSelected(order: Order): Boolean {
    return order.id === this.selectedOrderId;
  }

  select(order: Order) {
    this.orderClicked.emit(order);
  }
}
