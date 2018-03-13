import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { filter, map, switchMap, tap, takeWhile } from 'rxjs/operators';

import * as fromStore from '@state/order/order.reducer';
import * as fromCustomerStore from '@state/customer';
import * as fromLineItemStore from '@state/line-item';
import * as fromProductStore from '@state/product';
import { getSelectedOrder } from '@state/order';
import { LoadOrder, SelectOrder } from '@state/order/order.actions';
import { Order } from '@state/order/order.model';
import { Customer } from '@state/customer/customer.model';
import { LineItem } from '@state/line-item/line-item.model';
import { Product } from '@state/product/product.model';

@Component({
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  order$: Observable<Order>;
  customer$: Observable<Customer>;
  lineItems$: Observable<LineItem[]>;
  products$: Observable<Product[]>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<fromStore.State>
  ) {}

  ngOnInit() {
    this.order$ = this.activatedRoute.paramMap.pipe(
      map(params => params.get('id')),
      tap(id => this.store.dispatch(new LoadOrder({ id: +id }))),
      switchMap(() => this.store.pipe(select(getSelectedOrder)))
    );

    this.customer$ = this.store.pipe(select(fromCustomerStore.getCustomerBySelectedOrder));
    this.lineItems$ = this.store.pipe(select(fromLineItemStore.getOrderLineItems));
    this.products$ = this.store.pipe(select(fromProductStore.getAllProducts));
  }
}
