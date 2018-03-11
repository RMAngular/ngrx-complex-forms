import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromCustomers from './customer.reducer';
import { State as CustomersState } from './customer.reducer';

export const getCustomersState = createFeatureSelector<CustomersState>('customer');

export const {
  selectAll: getAllCustomers,
  selectEntities: getCustomerEntities,
  selectIds: getCustomerIds,
  selectTotal: getTotalCustomers
} = fromCustomers.adapter.getSelectors(getCustomersState);

export const getSelectedCustomerId = createSelector(
  getCustomersState,
  fromCustomers.getSelectedId
);

export const getLoading = createSelector(
  getCustomersState,
  fromCustomers.getLoading
);

export const getError = createSelector(
  getCustomersState,
  fromCustomers.getError
);
