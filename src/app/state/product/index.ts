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

export const getSelectedProductId = createSelector(
  getProductsState,
  fromProducts.getSelectedId
);

export const getSelectedProduct = createSelector(
  getSelectedProductId,
  getProductEntities,
  (selectedProductId, entities) => selectedProductId && entities[selectedProductId]
);

export const getLoading = createSelector(
  getProductsState,
  fromProducts.getLoading
);

export const getError = createSelector(
  getProductsState,
  fromProducts.getError
);
