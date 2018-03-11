import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromProducts from './product.reducer';
import { State as ProductsState } from './product.reducer';

export const getProductsState = createFeatureSelector<ProductsState>('product');

export const {
  selectIds: getProductIds,
  selectEntities: getProductEntities,
  selectAll: getAllProducts,
  selectTotal: getTotalProducts
} = fromProducts.adapter.getSelectors(getProductsState);

export const getSelectedCustomerId = createSelector(
  getProductsState,
  fromProducts.getSelectedId
);

export const getLoading = createSelector(
  getProductsState,
  fromProducts.getLoading
);

export const getError = createSelector(
  getProductsState,
  fromProducts.getError
);
