import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromCustomers from './customer.reducer';

export interface CustomersState {
  customers: fromCustomers.State;
}

export const reducers = {
  customers: fromCustomers.reducer
};

export const getCustomersState = createFeatureSelector<CustomersState>(
  'customers'
);

export const getCustomerEntitiesState = createSelector(
  getCustomersState,
  state => state.customers
);

export const {
  selectIds: getCustomerIds,
  selectEntities: getCustomerEntities,
  selectAll: getAllCustomers,
  selectTotal: getTotalCustomers
} = fromCustomers.adapter.getSelectors();

export const getSelectedCustomerId = createSelector(
  getCustomerEntitiesState,
  fromCustomers.getSelectedId
);

export const getLoading = createSelector(
  getCustomerEntitiesState,
  fromCustomers.getLoading
);

export const getError = createSelector(
  getCustomerEntitiesState,
  fromCustomers.getError
);
