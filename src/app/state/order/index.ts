import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromOrders from './order.reducer';

export interface OrdersState {
  customers: fromOrders.State;
}

export const reducers = {
  customers: fromOrders.reducer
};

export const getOrdersState = createFeatureSelector<OrdersState>(
  'customers'
);

export const getOrderEntitiesState = createSelector(
  getOrdersState,
  state => state.customers
);

export const {
  selectIds: getOrderIds,
  selectEntities: getOrderEntities,
  selectAll: getAllOrders,
  selectTotal: getTotalOrders
} = fromOrders.adapter.getSelectors();

export const getSelectedCustomerId = createSelector(
  getOrderEntitiesState,
  fromOrders.getSelectedId
);

export const getLoading = createSelector(
  getOrderEntitiesState,
  fromOrders.getLoading
);

export const getError = createSelector(
  getOrderEntitiesState,
  fromOrders.getError
);
