import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromLineItems from './line-item.reducer';
import { State as LineItemsState } from './line-item.reducer';

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
