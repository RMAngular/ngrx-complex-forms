import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { OrderView, Order } from '@state/order/order.model';
import { Product } from '@state/product/product.model';

@Component({
  selector: 'app-orders-table',
  templateUrl: './orders-table.component.html',
  styleUrls: ['./orders-table.component.scss']
})
export class OrdersTableComponent implements OnInit {
  displayedColumns = ['id', 'customer', 'total', 'actions'];
  @Input() ordersView: Array<OrderView>;
  @Output() delete = new EventEmitter<Order>();
  @Output() edit = new EventEmitter<Order>();

  constructor() { }

  ngOnInit() { }

  computeOrderTotal(orderView: OrderView): number {
    if (!orderView.lineItems.length) {
      return 0;
    }

    // using the order view, calculate the product price * lineItem qty
    return orderView.lineItems
      .map(lineItem => {
        const p = orderView.products.find(
          product => product.id === lineItem.productId
        ),
          price = p.price;

        return lineItem.quantity * price;
      })
      .reduce((prev, current) => prev + current);
  }

  getProductPrice(orderView: OrderView, id: number) {
    const data = orderView.products.find(
      (product: Product) => product.id === id
    );

    return data.price;
  }

  onDeleteOrder(order: Order) {
    this.delete.emit(order);
  }

  onEditOrder(order: Order) {
    this.edit.emit(order);
  }
}
