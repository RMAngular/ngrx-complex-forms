import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { Customer } from './customer.model';
import { CustomerActions, CustomerActionTypes } from './customer.actions';

export interface State extends EntityState<Customer> {
  // additional entities state properties
  loading: boolean;
  error: string;
}

export const adapter: EntityAdapter<Customer> = createEntityAdapter<Customer>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  loading: false,
  error: ''
});

export function reducer(
  state = initialState,
  action: CustomerActions
): State {
  switch (action.type) {
    case CustomerActionTypes.AddCustomer: {
      return adapter.addOne(action.payload.customer, state);
    }

    case CustomerActionTypes.UpsertCustomer: {
      return adapter.upsertOne(action.payload.customer, state);
    }

    case CustomerActionTypes.AddCustomers: {
      return adapter.addMany(action.payload.customers, state);
    }

    case CustomerActionTypes.UpsertCustomers: {
      return adapter.upsertMany(action.payload.customers, state);
    }

    case CustomerActionTypes.UpdateCustomer: {
      return adapter.updateOne(action.payload.customer, state);
    }

    case CustomerActionTypes.UpdateCustomers: {
      return adapter.updateMany(action.payload.customers, state);
    }

    case CustomerActionTypes.DeleteCustomer: {
      return adapter.removeOne(action.payload.id, state);
    }

    case CustomerActionTypes.DeleteCustomers: {
      return adapter.removeMany(action.payload.ids, state);
    }

    case CustomerActionTypes.LoadCustomers: {
      return {
        ...adapter.removeAll(state),
        loading: true,
        error: ''
      };
    }

    case CustomerActionTypes.LoadCustomersSuccess: {
      return {
        ...adapter.addAll(action.payload.customers, state),
        loading: false
      };
    }

    case CustomerActionTypes.LoadCustomersFail: {
      return {
        ...state,
        loading: false,
        error: 'error loading customers'
      };
    }

    case CustomerActionTypes.ClearCustomers: {
      return adapter.removeAll(state);
    }

    default: {
      return state;
    }
  }
}

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors();
