import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { map, switchMap, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { LineItem } from './line-item.model';
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
      mergeMap(action =>
        forkJoin(
          action.payload.lineItems.map(lineItem =>
            this.service.save({
              ...lineItem.changes,
              id: +lineItem.id
            })
          )
        )
      ),
      map(
        (lineItems: LineItem[]) =>
          new UpsertLineItemsSuccess({ lineItems: lineItems }),
        catchError(err => of(new UpsertLineItemsFail()))
      )
    );

  constructor(private actions$: Actions, private service: LineItemService) {}
}
