import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Product } from './product.model';
import { ProductActions, ProductActionTypes } from './product.actions';

export interface State extends EntityState<Product> {
  // additional entities state properties
  selectedProductId: string;
  loading: boolean;
  error: string;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedProductId: null,
  loading: false,
  error: ''
});

export function reducer(
  state = initialState,
  action: ProductActions
): State {
  switch (action.type) {
    case ProductActionTypes.AddProduct: {
      return adapter.addOne(action.payload.product, state);
    }

    case ProductActionTypes.UpsertProduct: {
      return adapter.upsertOne(action.payload.product, state);
    }

    case ProductActionTypes.AddProducts: {
      return adapter.addMany(action.payload.products, state);
    }

    case ProductActionTypes.UpsertProducts: {
      return adapter.upsertMany(action.payload.products, state);
    }

    case ProductActionTypes.UpdateProduct: {
      return adapter.updateOne(action.payload.product, state);
    }

    case ProductActionTypes.UpdateProducts: {
      return adapter.updateMany(action.payload.products, state);
    }

    case ProductActionTypes.DeleteProduct: {
      return adapter.removeOne(action.payload.id, state);
    }

    case ProductActionTypes.DeleteProducts: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case ProductActionTypes.LoadProducts: {
      return {
        ...adapter.removeAll(state),
        loading: true,
        error: ''
      };
    }

    case ProductActionTypes.LoadProductsSuccess: {
      return {
        ...adapter.addAll(action.payload.products, state),
        loading: false
      };
    }

    case ProductActionTypes.LoadProductsFail: {
      return {
        ...state,
        loading: false,
        error: 'error loading products'
      };
    }

    case ProductActionTypes.ClearProducts: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedProductId;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
