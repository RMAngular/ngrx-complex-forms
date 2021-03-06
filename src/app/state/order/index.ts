import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromOrders from './order.reducer';
import { State as OrdersState } from './order.reducer';

export const getOrdersState = createFeatureSelector<OrdersState>('order');

export const {
  selectAll: getAllOrders,
  selectEntities: getOrderEntities,
  selectIds: getOrderIds,
  selectTotal: getTotalOrders
} = fromOrders.adapter.getSelectors(getOrdersState);

export const getSelectedOrderId = createSelector(
  getOrdersState,
  fromOrders.getSelectedId
);

export const getSelectedOrder = createSelector(
  getSelectedOrderId,
  getOrderEntities,
  (selectedOrderId, entities) => selectedOrderId && entities[selectedOrderId]
);

export const getLoading = createSelector(getOrdersState, fromOrders.getLoading);

export const getError = createSelector(getOrdersState, fromOrders.getError);
