import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Validation } from '@core/interfaces/validation';
import { Store, select } from '@ngrx/store';
import * as fromCustomerStore from '@state/customer';
import { LoadCustomers } from '@state/customer/customer.actions';
import { Customer } from '@state/customer/customer.model';
import * as fromLineItemStore from '@state/line-item';
import { LoadLineItems } from '@state/line-item/line-item.actions';
import { LineItem } from '@state/line-item/line-item.model';
import { getSelectedOrder } from '@state/order';
import { AddOrder, LoadOrder, OpenOrderValidationDialog, UpdateLineItemsAndOrder } from '@state/order/order.actions';
import { Order } from '@state/order/order.model';
import * as fromStore from '@state/order/order.reducer';
import * as fromProductStore from '@state/product';
import { LoadProducts } from '@state/product/product.actions';
import { Product } from '@state/product/product.model';
import { clone } from 'ramda';
import { Observable , Subject } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';

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

  private destroyed$ = new Subject<void>();
  private lineItems: LineItem[];
  private order: Order;
  private validations: Map<AbstractControl, Validation>;

  constructor(private activatedRoute: ActivatedRoute, private store: Store<fromStore.State>) {}

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
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
    this.customers$ = this.store.pipe(select(fromCustomerStore.getAllCustomers));

    this.customer$ = this.store.pipe(select(fromCustomerStore.getCustomerBySelectedOrder));

    // get all line items
    this.store.dispatch(new LoadLineItems());
    this.lineItems$ = this.store.pipe(select(fromLineItemStore.getOrderLineItems), map(lineItems => clone(lineItems)));

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

  onValidationsChange(validations: Map<AbstractControl, Validation>) {
    this.validations = validations;
  }

  save() {
    // validate order
    const validations = [];
    if (this.validations && this.validations.size) {
      this.validations.forEach(validation => {
        if (!validation.valid) {
          validations.push(validation);
        }
      });
    }
    if (!this.lineItems || this.lineItems.length === 0) {
      const validation: Validation = {
        message: 'Orders must have at least one line item.',
        valid: false
      };
      validations.push(validation);
    }
    if (validations.length) {
      this.store.dispatch(new OpenOrderValidationDialog({ validations: validations }));
      return;
    }

    // update or add order
    if (this.order.id) {
      this.store.dispatch(
        new UpdateLineItemsAndOrder({
          lineItems: this.lineItems,
          order: this.order
        })
      );
    } else {
      this.store.dispatch(new AddOrder({ lineItems: this.lineItems, order: this.order }));
    }
  }
}
