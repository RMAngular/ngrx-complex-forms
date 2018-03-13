import { UpdateOrder } from './../../../state/order/order.actions';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, tap, takeWhile, skipWhile } from 'rxjs/operators';

import * as fromStore from '@state/order/order.reducer';
import * as fromCustomerStore from '@state/customer';
import * as fromLineItemStore from '@state/line-item';
import * as fromProductStore from '@state/product';
import { getSelectedOrder } from '@state/order';
import { LoadCustomer, LoadCustomers } from '@state/customer/customer.actions';
import { LoadLineItems } from '@state/line-item/line-item.actions';
import { LoadOrder } from '@state/order/order.actions';
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
      map(params => params.get('id')),
      tap(id => this.store.dispatch(new LoadOrder({ id: +id }))),
      switchMap(() => this.store.pipe(select(getSelectedOrder)))
    );

    // get all customers
    this.store.dispatch(new LoadCustomers());
    this.customers$ = this.store.pipe(
      select(fromCustomerStore.getAllCustomers)
    );

    // get customer for order
    this.customer$ = this.order$.pipe(
      skipWhile(order => !order),
      tap(order => {
        this.customerExistsInStore(order.customerId)
          .pipe(takeWhile(() => this.alive))
          .subscribe(exists => {
            if (!exists)
              this.store.dispatch(new LoadCustomer({ id: order.customerId }));
          });
      }),
      switchMap(() =>
        this.store.pipe(select(fromCustomerStore.getCustomerBySelectedOrder))
      )
    );

    // get all line items
    this.store.dispatch(new LoadLineItems());
    this.lineItems$ = this.store.pipe(
      select(fromLineItemStore.getOrderLineItems)
    );

    // get all products
    this.store.dispatch(new LoadProducts());
    this.products$ = this.store.pipe(select(fromProductStore.getAllProducts));
  }

  onOrderChange(order: Order) {
    this.order = order;
  }

  save() {
    console.log('save!', this.order);
    this.store.dispatch(
      new UpdateOrder({
        order: {
          id: this.order.id,
          changes: this.order
        }
      })
    );
  }

  private customerExistsInStore(id: number): Observable<boolean> {
    return this.store.pipe(
      select(fromCustomerStore.getAllCustomers),
      map(
        customers => customers.map(customer => customer.id).indexOf(id) !== -1
      )
    );
  }
}
