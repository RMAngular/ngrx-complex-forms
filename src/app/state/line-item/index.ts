import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromLineItems from './line-item.reducer';

export interface LineItemsState {
  customers: fromLineItems.State;
}

export const reducers = {
  customers: fromLineItems.reducer
};

export const getLineItemsState = createFeatureSelector<LineItemsState>(
  'customers'
);

export const getLineItemEntitiesState = createSelector(
  getLineItemsState,
  state => state.customers
);

export const {
  selectIds: getLineItemIds,
  selectEntities: getLineItemEntities,
  selectAll: getAllLineItems,
  selectTotal: getTotalLineItems
} = fromLineItems.adapter.getSelectors();

export const getSelectedCustomerId = createSelector(
  getLineItemEntitiesState,
  fromLineItems.getSelectedId
);

export const getLoading = createSelector(
  getLineItemEntitiesState,
  fromLineItems.getLoading
);

export const getError = createSelector(
  getLineItemEntitiesState,
  fromLineItems.getError
);
