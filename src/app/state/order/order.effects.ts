import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Order } from './order.model';
import { OrderActionTypes, LoadOrdersSuccess, LoadOrdersFail } from './order.actions';
import { OrderService } from '../../core/services/order.service';

@Injectable()
export class OrderEffects {
  @Effect()
  load: Observable<Action> = this.actions$.ofType(OrderActionTypes.LoadOrders)
    .pipe(
      switchMap(() => this.service.getOrders()),
      map(
        (orders: Order[]) => new LoadOrdersSuccess({ orders: orders }),
        catchError(err => of(new LoadOrdersFail()))
      )
    );

  constructor(private actions$: Actions,
    private service: OrderService) { }
}
