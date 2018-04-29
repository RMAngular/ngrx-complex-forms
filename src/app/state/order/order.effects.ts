import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import {
  map,
  switchMap,
  catchError,
  mergeMap,
  withLatestFrom
} from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Order } from './order.model';
import {
  OrderActionTypes,
  LoadOrdersSuccess,
  LoadOrdersFail,
  LoadOrder,
  LoadOrderSuccess,
  LoadOrderFail,
  LoadOrders,
  UpdateOrder,
  UpdateOrderSuccess,
  UpdateOrderFail
} from './order.actions';
import { OrderService } from '@core/services/order.service';
import { LoadCustomers } from '@state/customer/customer.actions';
import { LoadProducts } from '@state/product/product.actions';
import { LoadLineItems } from '@state/line-item/line-item.actions';
import { AppState } from '@state/app.interfaces';
import * as fromStore from './';

@Injectable()
export class OrderEffects {
  @Effect()
  loadOrdersView = this.actions$
    .ofType(OrderActionTypes.LoadOrdersView)
    .pipe(
      mergeMap(add => [
        new LoadOrders(),
        new LoadCustomers(),
        new LoadProducts(),
        new LoadLineItems()
      ])
    );

  @Effect()
  load: Observable<Action> = this.actions$
    .ofType(OrderActionTypes.LoadOrders)
    .pipe(
      switchMap(() => this.service.getOrders()),
      map((orders: Order[]) => new LoadOrdersSuccess({ orders: orders })),
      catchError(err => of(new LoadOrdersFail()))
    );

  @Effect()
  loadById: Observable<Action> = this.actions$
    .ofType<LoadOrder>(OrderActionTypes.LoadOrder)
    .pipe(
      switchMap(action => this.service.getOrder(action.payload.id)),
      map((order: Order) => new LoadOrderSuccess({ order: order })),
      catchError(err => of(new LoadOrderFail()))
    );

  @Effect()
  update: Observable<Action> = this.actions$
    .ofType<UpdateOrder>(OrderActionTypes.UpdateOrder)
    .pipe(
      withLatestFrom(this.store.pipe(select(fromStore.getSelectedOrder))),
      switchMap(([action, order]) => this.service.save(order)),
      map((order: Order) => new UpdateOrderSuccess({ order: order })),
      catchError(err => of(new UpdateOrderFail()))
    );

  constructor(
    private actions$: Actions,
    private service: OrderService,
    private store: Store<AppState>
  ) {}
}
