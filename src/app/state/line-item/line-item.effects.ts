import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { map, switchMap, catchError, mergeMap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { LineItem } from './line-item.model';
import * as fromStore from './';
import {
  LineItemActionTypes,
  LoadLineItem,
  LoadLineItemSuccess,
  LoadLineItemFail,
  LoadLineItemsSuccess,
  LoadLineItemsFail,
  UpsertLineItems,
  UpsertLineItemsSuccess,
  UpsertLineItemsFail
} from './line-item.actions';
import { LineItemService } from '@core/services/line-item.service';
import { AppState } from '@state/app.interfaces';

@Injectable()
export class LineItemEffects {
  @Effect()
  load: Observable<Action> = this.actions$
    .ofType(LineItemActionTypes.LoadLineItems)
    .pipe(
      switchMap(() => this.service.getLineItems()),
      map(
        (lineItems: LineItem[]) =>
          new LoadLineItemsSuccess({ lineItems: lineItems }),
        catchError(err => of(new LoadLineItemsFail()))
      )
    );

  @Effect()
  loadById: Observable<Action> = this.actions$
    .ofType<LoadLineItem>(LineItemActionTypes.LoadLineItem)
    .pipe(
      switchMap(action => this.service.getLineItem(action.payload.id)),
      map(
        (lineItem: LineItem) => new LoadLineItemSuccess({ lineItem: lineItem }),
        catchError(err => of(new LoadLineItemFail()))
      )
    );

  @Effect()
  upsert: Observable<Action> = this.actions$
    .ofType<UpsertLineItems>(LineItemActionTypes.UpsertLineItem)
    .pipe(
      withLatestFrom(this.store.pipe(select(fromStore.getOrderLineItems))),
      mergeMap(([action, lineItems]) =>
        forkJoin(
          lineItems.map(lineItem =>
            this.service.save(lineItem)
          )
        )
      ),
      map(
        (lineItems: LineItem[]) =>
          new UpsertLineItemsSuccess({ lineItems: lineItems }),
        catchError(err => of(new UpsertLineItemsFail()))
      )
    );

  constructor(private actions$: Actions, private service: LineItemService,
    private store: Store<AppState>) { }
}
