import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { LineItemActionTypes, LineItemActions } from './line-item.actions';
import { LineItem } from './line-item.model';

export interface State extends EntityState<LineItem> {
  // additional entities state properties
  selectedLineItemId: number;
  loading: boolean;
  error: string;
}

export const adapter: EntityAdapter<LineItem> = createEntityAdapter<LineItem>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedLineItemId: null,
  loading: false,
  error: ''
});

export function reducer(state = initialState, action: LineItemActions): State {
  switch (action.type) {
    case LineItemActionTypes.AddLineItemSuccess: {
      return adapter.addOne(action.payload.lineItem, state);
    }

    case LineItemActionTypes.DeleteLineItemSuccess: {
      return adapter.removeOne(action.payload.id, state);
    }

    case LineItemActionTypes.LoadLineItem: {
      return {
        ...state,
        loading: true,
        error: ''
      };
    }

    case LineItemActionTypes.LoadLineItemSuccess: {
      return {
        ...adapter.addOne(action.payload.lineItem, state),
        loading: false
      };
    }

    case LineItemActionTypes.LoadLineItemFail: {
      return {
        ...state,
        loading: false,
        error: 'error loading line item'
      };
    }

    case LineItemActionTypes.LoadLineItems: {
      return {
        ...adapter.removeAll(state),
        loading: true,
        error: ''
      };
    }

    case LineItemActionTypes.LoadLineItemsSuccess: {
      return {
        ...adapter.addAll(action.payload.lineItems, state),
        loading: false
      };
    }

    case LineItemActionTypes.LoadLineItemsFail: {
      return {
        ...state,
        loading: false,
        error: 'error loading line items'
      };
    }

    case LineItemActionTypes.UpsertLineItemsSuccess: {
      return adapter.upsertMany(action.payload.lineItems, state);
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedLineItemId;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
