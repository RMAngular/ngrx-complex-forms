import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromOrders from './order.reducer';
import { State as OrdersState } from './order.reducer';

export const getOrdersState = createFeatureSelector<OrdersState>('orders');

export const {
  selectAll: getAllOrders,
  selectEntities: getOrderEntities,
  selectIds: getOrderIds,
  selectTotal: getTotalOrders
} = fromOrders.adapter.getSelectors(getOrdersState);

export const getSelectedCustomerId = createSelector(
  getOrdersState,
  fromOrders.getSelectedId
);

export const getLoading = createSelector(
  getOrdersState,
  fromOrders.getLoading
);

export const getError = createSelector(
  getOrdersState,
  fromOrders.getError
);
