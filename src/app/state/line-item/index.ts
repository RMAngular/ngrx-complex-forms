import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromLineItems from './line-item.reducer';
import * as fromOrders from '../order';
import { State as LineItemsState } from './line-item.reducer';
import { LineItem } from '@state/line-item/line-item.model';
import { Order } from '@state/order/order.model';

export const getLineItemsState = createFeatureSelector<LineItemsState>('lineItem');

export const {
  selectIds: getLineItemIds,
  selectEntities: getLineItemEntities,
  selectAll: getAllLineItems,
  selectTotal: getTotalLineItems
} = fromLineItems.adapter.getSelectors(getLineItemsState);

export const getSelectedCustomerId = createSelector(
  getLineItemsState,
  fromLineItems.getSelectedId
);

export const getLoading = createSelector(
  getLineItemsState,
  fromLineItems.getLoading
);

export const getError = createSelector(
  getLineItemsState,
  fromLineItems.getError
);

export const getOrderLineItems = createSelector(
  getLineItemEntities,
  fromOrders.getSelectedOrder,
  (lineItems, order: Order) => {
    let val: LineItem[] = [];

    order.lineItemIds.forEach((id) => {
      val.push(lineItems[id])
    });

    return val;
  }
);
