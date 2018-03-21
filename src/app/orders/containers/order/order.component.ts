import { getOrderLineItems } from './../../../state/line-item/index';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {
  filter,
  map,
  skipWhile,
  switchMap,
  takeWhile,
  tap
} from 'rxjs/operators';
import { clone } from 'ramda';

import * as fromStore from '@state/order/order.reducer';
import * as fromCustomerStore from '@state/customer';
import * as fromLineItemStore from '@state/line-item';
import * as fromProductStore from '@state/product';
import { getSelectedOrder } from '@state/order';
import { LoadCustomer, LoadCustomers } from '@state/customer/customer.actions';
import {
  LoadLineItems,
  UpsertLineItems
} from '@state/line-item/line-item.actions';
import { LoadOrder, UpdateOrder } from '@state/order/order.actions';
import { LoadProducts } from '@state/product/product.actions';
import { Order } from '@state/order/order.model';
import { Customer } from '@state/customer/customer.model';
import { LineItem } from '@state/line-item/line-item.model';
import { Product } from '@state/product/product.model';

@Component({
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnDestroy, OnInit {
  order$: Observable<Order>;
  customer$: Observable<Customer>;
  customers$: Observable<Customer[]>;
  lineItems$: Observable<LineItem[]>;
  products$: Observable<Product[]>;

  private alive = true;
  private lineItems: LineItem[];
  private order: Order;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<fromStore.State>
  ) {}

  ngOnDestroy() {
    this.alive = false;
  }

  ngOnInit() {
    this.order$ = this.activatedRoute.paramMap.pipe(
      filter(params => params.has('id')),
      map(params => params.get('id')),
      tap(id => this.store.dispatch(new LoadOrder({ id: +id }))),
      switchMap(() => this.store.pipe(select(getSelectedOrder))),
      map(order => clone(order))
    );

    // get all customers
    this.store.dispatch(new LoadCustomers());
    this.customers$ = this.store.pipe(
      select(fromCustomerStore.getAllCustomers)
    );

    this.customer$ = this.store.pipe(
      select(fromCustomerStore.getCustomerBySelectedOrder)
    );

    // get all line items
    this.store.dispatch(new LoadLineItems());
    this.lineItems$ = this.store.pipe(
      select(fromLineItemStore.getOrderLineItems),
      map(lineItems => clone(lineItems))
    );

    // get all products
    this.store.dispatch(new LoadProducts());
    this.products$ = this.store.pipe(select(fromProductStore.getAllProducts));
  }

  onLineItemsChange(lineItems: LineItem[]) {
    this.lineItems = lineItems;
  }

  onOrderChange(order: Order) {
    this.order = order;
  }

  save() {
    console.log('save!', this.lineItems, this.order);

    // upsert each line item
    this.store.dispatch(
      new UpsertLineItems({
        lineItems: this.lineItems.map(lineItem => {
          return {
            id: lineItem.id,
            changes: lineItem
          };
        })
      })
    );

    // update order
    this.store.pipe(
      select(fromLineItemStore.getOrderLineItems),
      map(lineItems => {
        // console.log(lineItems);
        this.order.lineItemIds = lineItems.map(lineItem => lineItem.id);
        this.store.dispatch(
          new UpdateOrder({
            order: {
              id: this.order.id,
              changes: this.order
            }
          })
        );
      })
    );
  }
}
