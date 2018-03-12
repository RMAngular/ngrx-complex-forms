import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity/src/models';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { AppState } from '@state/app.interfaces';

import { Order, OrderView } from '@state/order/order.model';
import { LineItem } from '@state/line-item/line-item.model';
import * as fromStore from '@state/order';
import * as fromCustomerStore from '@state/customer';
import * as fromLineItemStore from '@state/line-item';
import * as fromProductStore from '@state/product';
import { LoadOrders, SelectOrder, LoadOrdersView } from '@state/order/order.actions';
import { Router } from '@angular/router';
import { Customer } from '@state/customer/customer.model';
import { LoadCustomers } from '@state/customer/customer.actions';
import { combineLatest, filter, withLatestFrom, map } from 'rxjs/operators';
import { Product } from '@state/product/product.model';
import { OrdersModule } from '../../orders.module';

@Component({
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  selectedId$: Observable<string>;
  orders$: Observable<OrderView[]>;

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new LoadOrdersView());

    const orders$ = this.store.pipe(select(fromStore.getAllOrders)),
      customers$ = this.store.pipe(select(fromCustomerStore.getCustomerEntities)),
      lineItems$ = this.store.pipe(select(fromLineItemStore.getLineItemEntities)),
      products$ = this.store.pipe(select(fromProductStore.getProductEntities));

    this.selectedId$ = this.store.pipe(select(fromStore.getSelectedOrderId));

    this.orders$ = orders$.pipe(
      combineLatest(customers$, lineItems$, products$),
      filter(([orders, customers, lineItems, products]) => !!orders && !!customers && !!lineItems && !!products),
      map(([orders, customers, lineItems, products]) => {
        return orders.map((order) => {
          const c: Customer = customers[order.customerId],
            name = c ? c.firstName + ' ' + c.lastName : '';

          let total: number = 0;

          // calculate the totals
          order.lineItemIds.forEach((id) => {
            const lineItem = lineItems[id];

            if (lineItem && products[lineItem.productId]) {
              total += lineItem.quantity * products[lineItem.productId].price;
            }
          });

          return { id: order.id, name: name, total: total };
        });
      })
    );
  }

  onSelectOrder(order) {
    this.store.dispatch(new SelectOrder({ order: order }));
    this.router.navigate(['orders', order.id]);
  }
}
