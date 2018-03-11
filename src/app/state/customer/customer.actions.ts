import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Customer } from './customer.model';

export enum CustomerActionTypes {
  LoadCustomers = '[Customer] Load Customers',
  LoadCustomersSuccess = '[Customer] Load Customers Success',
  LoadCustomersFail = '[Customer] Load Customers Fail',
  AddCustomer = '[Customer] Add Customer',
  UpsertCustomer = '[Customer] Upsert Customer',
  AddCustomers = '[Customer] Add Customers',
  UpsertCustomers = '[Customer] Upsert Customers',
  UpdateCustomer = '[Customer] Update Customer',
  UpdateCustomers = '[Customer] Update Customers',
  DeleteCustomer = '[Customer] Delete Customer',
  DeleteCustomers = '[Customer] Delete Customers',
  ClearCustomers = '[Customer] Clear Customers'
}

export class LoadCustomers implements Action {
  readonly type = CustomerActionTypes.LoadCustomers;
}

export class LoadCustomersSuccess implements Action {
  readonly type = CustomerActionTypes.LoadCustomersSuccess;

  constructor(public payload: { customers: Customer[] }) { }
}

export class LoadCustomersFail implements Action {
  readonly type = CustomerActionTypes.LoadCustomersFail;
}

export class AddCustomer implements Action {
  readonly type = CustomerActionTypes.AddCustomer;

  constructor(public payload: { customer: Customer }) { }
}

export class UpsertCustomer implements Action {
  readonly type = CustomerActionTypes.UpsertCustomer;

  constructor(public payload: { customer: Update<Customer> }) { }
}

export class AddCustomers implements Action {
  readonly type = CustomerActionTypes.AddCustomers;

  constructor(public payload: { customers: Customer[] }) { }
}

export class UpsertCustomers implements Action {
  readonly type = CustomerActionTypes.UpsertCustomers;

  constructor(public payload: { customers: Update<Customer>[] }) { }
}

export class UpdateCustomer implements Action {
  readonly type = CustomerActionTypes.UpdateCustomer;

  constructor(public payload: { customer: Update<Customer> }) { }
}

export class UpdateCustomers implements Action {
  readonly type = CustomerActionTypes.UpdateCustomers;

  constructor(public payload: { customers: Update<Customer>[] }) { }
}

export class DeleteCustomer implements Action {
  readonly type = CustomerActionTypes.DeleteCustomer;

  constructor(public payload: { id: string }) { }
}

export class DeleteCustomers implements Action {
  readonly type = CustomerActionTypes.DeleteCustomers;

  constructor(public payload: { ids: string[] }) { }
}

export class ClearCustomers implements Action {
  readonly type = CustomerActionTypes.ClearCustomers;
}

export type CustomerActions =
  LoadCustomers
  | LoadCustomersSuccess
  | LoadCustomersFail
  | AddCustomer
  | UpsertCustomer
  | AddCustomers
  | UpsertCustomers
  | UpdateCustomer
  | UpdateCustomers
  | DeleteCustomer
  | DeleteCustomers
  | ClearCustomers;
