import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { LineItem } from './line-item.model';
import { LineItemActionTypes, LoadLineItemsSuccess, LoadLineItemsFail } from './line-item.actions';
import { LineItemService } from '../../core/services/line-item.service';

@Injectable()
export class LineItemEffects {
  @Effect()
  load: Observable<Action> = this.actions$.ofType(LineItemActionTypes.LoadLineItems)
    .pipe(
      switchMap(() => this.service.getLineItems()),
      map(
        (lineItems: LineItem[]) => new LoadLineItemsSuccess({ lineItems: lineItems }),
        catchError(err => of(new LoadLineItemsFail()))
      )
    );

  constructor(private actions$: Actions,
    private service: LineItemService) { }
}
