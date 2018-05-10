import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { OrderActionTypes, OrderActions } from './order.actions';
import { Order } from './order.model';

export interface State extends EntityState<Order> {
  // additional entities state properties
  selectedOrderId: number;
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

export function reducer(state = initialState, action: OrderActions): State {
  switch (action.type) {
    case OrderActionTypes.AddOrderSuccess: {
      return adapter.addOne(action.payload.order, state);
    }

    case OrderActionTypes.ClearSelectedOrder: {
      return { ...state, selectedOrderId: null };
    }

    case OrderActionTypes.DeleteOrderSuccess: {
      return adapter.removeOne(action.payload.id, state);
    }

    case OrderActionTypes.UpdateOrderSuccess: {
      return adapter.updateOne(action.payload.order, state);
    }

    case OrderActionTypes.LoadOrder: {
      return {
        ...state,
        selectedOrderId: action.payload.id,
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

    case OrderActionTypes.SelectOrder: {
      return {
        ...state,
        selectedOrderId: action.payload.order.id
      };
    }

    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: State) => state.selectedOrderId;
export const getLoading = (state: State) => state.loading;
export const getError = (state: State) => state.error;
