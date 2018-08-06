import { Injectable } from '@angular/core';
import { CustomerService } from '@core/services/customer.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  CustomerActionTypes,
  LoadCustomer,
  LoadCustomerFail,
  LoadCustomerSuccess,
  LoadCustomersFail,
  LoadCustomersSuccess
} from './customer.actions';
import { Customer } from './customer.model';

@Injectable()
export class CustomerEffects {
  @Effect()
  load: Observable<Action> = this.actions$.pipe(
    ofType(CustomerActionTypes.LoadCustomers),
    switchMap(() => this.service.getCustomers()),
    map((customers: Customer[]) => new LoadCustomersSuccess({ customers: customers })),
    catchError(err => of(new LoadCustomersFail()))
  );

  @Effect()
  loadById: Observable<Action> = this.actions$.pipe(
    ofType<LoadCustomer>(CustomerActionTypes.LoadCustomer),
    switchMap(action => this.service.getCustomer(action.payload.id)),
    map((customer: Customer) => new LoadCustomerSuccess({ customer: customer })),
    catchError(err => of(new LoadCustomerFail()))
  );

  constructor(private actions$: Actions, private service: CustomerService) {}
}
