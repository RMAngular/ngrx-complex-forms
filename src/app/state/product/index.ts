import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromProducts from './product.reducer';

export interface ProductsState {
  customers: fromProducts.State;
}

export const reducers = {
  customers: fromProducts.reducer
};

export const getProductsState = createFeatureSelector<ProductsState>(
  'customers'
);

export const getProductEntitiesState = createSelector(
  getProductsState,
  state => state.customers
);

export const {
  selectIds: getProductIds,
  selectEntities: getProductEntities,
  selectAll: getAllProducts,
  selectTotal: getTotalProducts
} = fromProducts.adapter.getSelectors();

export const getSelectedCustomerId = createSelector(
  getProductEntitiesState,
  fromProducts.getSelectedId
);

export const getLoading = createSelector(
  getProductEntitiesState,
  fromProducts.getLoading
);

export const getError = createSelector(
  getProductEntitiesState,
  fromProducts.getError
);
