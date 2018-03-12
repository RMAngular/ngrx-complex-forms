import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity/src/models';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { AppState } from '@state/app.interfaces';

import { Order, OrderView } from '@state/order/order.model';
import * as fromStore from '@state/order';
import * as fromCustomerStore from '@state/customer';
import { LoadOrders, SelectOrder, LoadOrdersView } from '@state/order/order.actions';
import { Router } from '@angular/router';
import { Customer } from '@state/customer/customer.model';
import { LoadCustomers } from '@state/customer/customer.actions';
import { combineLatest, filter, withLatestFrom, map } from 'rxjs/operators';

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

    const orders$ = this.store.pipe(select(fromStore.getAllOrders));
    const customers$ = this.store.pipe(select(fromCustomerStore.getCustomerEntities));
    this.selectedId$ = this.store.pipe(select(fromStore.getSelectedOrderId));

    this.orders$ = orders$.pipe(
      combineLatest(customers$),
      filter(([orders, customers]) => !!orders && !!customers),
      map(([orders, customers]) => {
        return orders.map((order) => {
          return { order: order, customer: customers[order.customerId] };
        });
      })
    );
  }

  onSelectOrder(order) {
    this.store.dispatch(new SelectOrder({ order: order }));
    this.router.navigate(['orders', order.id]);
  }
}
