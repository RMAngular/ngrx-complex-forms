import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromOrders from '../order';
import * as fromCustomers from './customer.reducer';
import { State as CustomersState } from './customer.reducer';

export const getCustomersState = createFeatureSelector<CustomersState>(
  'customer'
);

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

// export const getCustomerById = id =>
//   createSelector(getCustomerEntities, customers => customers[id]);

export const getCustomerBySelectedOrder = createSelector(
  getCustomerEntities,
  fromOrders.getSelectedOrder,
  (customers, order) => customers && order && customers[order.customerId]
);
