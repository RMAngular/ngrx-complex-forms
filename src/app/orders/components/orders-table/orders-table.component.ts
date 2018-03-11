import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';
import { Order } from '@state/order/order.model';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit {
  displayedColumns = ['id', 'customer', 'total'];
  selectedOrder: Observable<Order>;
  @Input() orders: Array<Order>;

  constructor() { }

  ngOnInit() { }

  computeOrderTotal(order: Order): number {
    return 0;
    // return order.lineItems
    //   .map(lineItem => lineItem.price)
    //   .reduce((prev, current) => prev + current);
  }

  isSelected(order: Order): Observable<boolean> {
    // verify an order is selected
    if (this.selectedOrder === undefined) {
      return of(false);
    }

    return this.selectedOrder.pipe(map(o => o.id === order.id));
  }

  select(order: Order) {
    // todo: dispatch action to select order
    this.selectedOrder = of(order);
  }
}
