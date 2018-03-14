import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity/src/models';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { combineLatest, filter, withLatestFrom, map } from 'rxjs/operators';

import { AppState } from '@state/app.interfaces';
import * as fromStore from '@state/order';
import * as fromCustomerStore from '@state/customer';
import * as fromLineItemStore from '@state/line-item';
import * as fromProductStore from '@state/product';
import { LoadCustomers } from '@state/customer/customer.actions';
import {
  DeleteOrder,
  LoadOrders,
  SelectOrder,
  LoadOrdersView
} from '@state/order/order.actions';
import { Customer } from '@state/customer/customer.model';
import { LineItem } from '@state/line-item/line-item.model';
import { Order, OrderView } from '@state/order/order.model';
import { Product } from '@state/product/product.model';

@Component({
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders$: Observable<OrderView[]>;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new LoadOrdersView());

    const orders$ = this.store.pipe(select(fromStore.getAllOrders)),
      customers$ = this.store.pipe(
        select(fromCustomerStore.getCustomerEntities)
      ),
      lineItems$ = this.store.pipe(
        select(fromLineItemStore.getLineItemEntities)
      ),
      products$ = this.store.pipe(select(fromProductStore.getProductEntities));

    this.orders$ = orders$.pipe(
      combineLatest(customers$, lineItems$, products$),
      filter(
        ([orders, customers, lineItems, products]) =>
          !!orders && !!customers && !!lineItems && !!products
      ),
      map(([orders, customers, lineItems, products]) => {
        return orders.map(order => {
          const c: Customer = customers[order.customerId],
            l: LineItem[] = [],
            p: Product[] = [];

          // find the line items
          order.lineItemIds.forEach(id => {
            if (lineItems[id]) {
              l.push(lineItems[id]);
            }
          });

          // find the products
          l.forEach(lineItem => {
            if (products[lineItem.productId]) {
              p.push(products[lineItem.productId]);
            }
          });

          return { order: order, customer: c, lineItems: l, products: p };
        });
      })
    );
  }

  onDeleteOrder(order: Order) {
    this.store.dispatch(new DeleteOrder({ id: order.id }));
  }

  onEditOrder(order: Order) {
    this.store.dispatch(new SelectOrder({ order: order }));
    this.router.navigate(['orders', order.id]);
  }
}
