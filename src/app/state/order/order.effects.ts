import { Injectable } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { OrderService } from '@core/services/order.service';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { ValidationDialogComponent } from '@shared/dialogs/validation-dialog/validation-dialog.component';
import { AppState } from '@state/app.interfaces';
import { LoadCustomers } from '@state/customer/customer.actions';
import { DeleteLineItem, LoadLineItems, UpsertLineItems } from '@state/line-item/line-item.actions';
import { LoadProducts } from '@state/product/product.actions';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, exhaustMap, filter, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import {
  AddOrder,
  AddOrderFail,
  AddOrderSuccess,
  CloseOrderValidationDialog,
  LoadOrder,
  LoadOrderFail,
  LoadOrderSuccess,
  LoadOrders,
  LoadOrdersFail,
  LoadOrdersSuccess,
  OpenOrderValidationDialog,
  OrderActionTypes,
  UpdateLineItemsAndOrder,
  UpdateOrder,
  UpdateOrderFail,
  UpdateOrderSuccess
} from './order.actions';
import { Order } from './order.model';

@Injectable()
export class OrderEffects {
  @Effect()
  add: Observable<Action> = this.actions$
    .ofType<AddOrder>(OrderActionTypes.AddOrder)
    .pipe(
      map(action => action.payload),
      filter(payload => !payload.order.id),
      switchMap(payload =>
        this.service
          .save(payload.order)
          .pipe(
            map(order => new AddOrderSuccess({ lineItems: payload.lineItems, order })),
            catchError(err => of(new LoadOrdersFail()))
          )
      )
    );

  @Effect({
    dispatch: false
  })
  closeValidationDialog: Observable<Action> = this.actions$
    .ofType<CloseOrderValidationDialog>(OrderActionTypes.CloseOrderValidationDialog)
    .pipe(tap(action => this.matDialog.closeAll()));

  @Effect()
  deleteLineItems: Observable<Action> = this.actions$
    .ofType<UpdateLineItemsAndOrder>(OrderActionTypes.UpdateLineItemsAndOrder)
    .pipe(
      map(action => action.payload),
      filter(payload => !!payload.order && !!payload.order.lineItemIds && payload.order.lineItemIds.length > 0),
      map(payload =>
        payload.order.lineItemIds.filter(id => payload.lineItems.map(lineItem => lineItem.id).indexOf(id) === -1)
      ),
      filter(ids => !!ids.length),
      switchMap(ids => ids.map(id => new DeleteLineItem({ id })))
    );

  @Effect()
  load: Observable<Action> = this.actions$
    .ofType(OrderActionTypes.LoadOrders)
    .pipe(
      exhaustMap(() => this.service.getOrders()),
      map((orders: Order[]) => new LoadOrdersSuccess({ orders })),
      catchError(err => of(new AddOrderFail()))
    );

  @Effect()
  loadOrdersView = this.actions$
    .ofType(OrderActionTypes.LoadOrdersView)
    .pipe(mergeMap(add => [new LoadOrders(), new LoadCustomers(), new LoadProducts(), new LoadLineItems()]));

  @Effect()
  loadById: Observable<Action> = this.actions$
    .ofType<LoadOrder>(OrderActionTypes.LoadOrder)
    .pipe(
      exhaustMap(action => this.service.getOrder(action.payload.id)),
      map((order: Order) => new LoadOrderSuccess({ order })),
      catchError(err => of(new LoadOrderFail()))
    );

  @Effect({
    dispatch: false
  })
  openValidationDialog: Observable<Action> = this.actions$
    .ofType<OpenOrderValidationDialog>(OrderActionTypes.OpenOrderValidationDialog)
    .pipe(
      tap((action: OpenOrderValidationDialog) =>
        this.matDialog.open(ValidationDialogComponent, {
          data: {
            validations: action.payload.validations
          }
        })
      )
    );

  @Effect({
    dispatch: false
  })
  showSnackBarAfterUpdate: Observable<Action> = this.actions$
    .ofType<UpdateOrderSuccess>(OrderActionTypes.UpdateOrderSuccess)
    .pipe(tap(() => this.matSnackBar.open('Order Saved.', 'Success', { duration: 2000 })));

  @Effect()
  update: Observable<Action> = this.actions$.ofType<UpdateOrder>(OrderActionTypes.UpdateOrder).pipe(
    map(action => action.payload.order),
    exhaustMap(order => this.service.save(order)),
    map(
      order =>
        new UpdateOrderSuccess({
          order: {
            id: order.id,
            changes: order
          }
        })
    ),
    catchError(err => of(new UpdateOrderFail()))
  );

  @Effect()
  upsertLineItems: Observable<Action> = this.actions$
    .ofType<UpdateLineItemsAndOrder | AddOrderSuccess>(
      OrderActionTypes.UpdateLineItemsAndOrder,
      OrderActionTypes.AddOrderSuccess
    )
    .pipe(map(action => action.payload), map(payload => new UpsertLineItems(payload)));

  constructor(
    private actions$: Actions,
    private matDialog: MatDialog,
    private matSnackBar: MatSnackBar,
    private service: OrderService,
    private store: Store<AppState>
  ) {}
}
