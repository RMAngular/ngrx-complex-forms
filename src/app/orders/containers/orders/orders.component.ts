import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { AppState } from '@state/app.interfaces';

import { Order } from '@state/order/order.model';
import * as fromStore from '@state/order';
import { LoadOrders } from '@state/order/order.actions';

@Component({
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders$: Observable<Order[]>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.store.dispatch(new LoadOrders());
    this.orders$ = this.store.pipe(select(fromStore.getAllOrders));
  }
}
