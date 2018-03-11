import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Customer } from './customer.model';
import { CustomerActionTypes, LoadCustomersSuccess, LoadCustomersFail } from './customer.actions';
import { CustomerService } from '../../core/services/customer.service';

@Injectable()
export class CustomerEffects {

  @Effect()
  load: Observable<Action> = this.actions$.ofType(CustomerActionTypes.LoadCustomers)
    .pipe(
      switchMap(() => this.service.getCustomers()),
      map(
        (customers: Customer[]) => new LoadCustomersSuccess({ customers: customers }),
        catchError(err => of(new LoadCustomersFail()))
      )
    );

  constructor(private actions$: Actions,
    private service: CustomerService) { }
}
