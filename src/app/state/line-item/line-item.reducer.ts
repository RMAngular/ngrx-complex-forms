import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { LineItem } from './line-item.model';
import { LineItemActions, LineItemActionTypes } from './line-item.actions';

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
    case LineItemActionTypes.AddLineItem: {
      return adapter.addOne(action.payload.lineItem, state);
    }

    case LineItemActionTypes.UpsertLineItem: {
      return adapter.upsertOne(action.payload.lineItem, state);
    }

    case LineItemActionTypes.AddLineItems: {
      return adapter.addMany(action.payload.lineItems, state);
    }

    case LineItemActionTypes.UpsertLineItems: {
      return adapter.upsertMany(action.payload.lineItems, state);
    }

    case LineItemActionTypes.UpdateLineItem: {
      return adapter.updateOne(action.payload.lineItem, state);
    }

    case LineItemActionTypes.UpdateLineItems: {
      return adapter.updateMany(action.payload.lineItems, state);
    }

    case LineItemActionTypes.DeleteLineItem: {
      return adapter.removeOne(action.payload.id, state);
    }

    case LineItemActionTypes.DeleteLineItems: {
      return adapter.removeMany(action.payload.ids, state);
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

    case LineItemActionTypes.ClearLineItems: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedLineItemId;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
