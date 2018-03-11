import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Order } from './order.model';
import { OrderActions, OrderActionTypes } from './order.actions';

export interface State extends EntityState<Order> {
  // additional entities state properties
  selectedOrderId: string;
  loading: boolean;
  error: string;
}

export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  selectedOrderId: null,
  loading: false,
  error: ''
});

export function reducer(
  state = initialState,
  action: OrderActions
): State {
  switch (action.type) {
    case OrderActionTypes.AddOrder: {
      return adapter.addOne(action.payload.order, state);
    }

    case OrderActionTypes.UpsertOrder: {
      return adapter.upsertOne(action.payload.order, state);
    }

    case OrderActionTypes.AddOrders: {
      return adapter.addMany(action.payload.orders, state);
    }

    case OrderActionTypes.UpsertOrders: {
      return adapter.upsertMany(action.payload.orders, state);
    }

    case OrderActionTypes.UpdateOrder: {
      return adapter.updateOne(action.payload.order, state);
    }

    case OrderActionTypes.UpdateOrders: {
      return adapter.updateMany(action.payload.orders, state);
    }

    case OrderActionTypes.DeleteOrder: {
      return adapter.removeOne(action.payload.id, state);
    }

    case OrderActionTypes.DeleteOrders: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case OrderActionTypes.LoadOrders: {
      return {
        ...adapter.removeAll(state),
        loading: true,
        error: ''
      };
    }

    case OrderActionTypes.LoadOrdersSuccess: {
      return {
        ...adapter.addAll(action.payload.orders, state),
        loading: false
      };
    }

    case OrderActionTypes.LoadOrdersFail: {
      return {
        ...state,
        loading: false,
        error: 'error loading orders'
      };
    }

    case OrderActionTypes.LoadOrder: {
      return {
        ...adapter.removeAll(state),
        loading: true,
        error: ''
      };
    }

    case OrderActionTypes.LoadOrderSuccess: {
      return {
        ...adapter.addOne(action.payload.order, state),
        loading: false
      };
    }

    case OrderActionTypes.LoadOrderFail: {
      return {
        ...state,
        loading: false,
        error: 'error loading order'
      };
    }

    case OrderActionTypes.ClearOrders: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedOrderId;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
