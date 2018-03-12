import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { environment } from '../../environments/environment';
import { AppState } from './app.interfaces';
import { reducer as customerReducer } from './customer/customer.reducer';
import { reducer as productReducer } from './product/product.reducer';
import { reducer as orderReducer } from './order/order.reducer';
import { reducer as lineItemReducer } from './line-item/line-item.reducer';

export const appReducer: ActionReducerMap<AppState> = {
  router: routerReducer,
  customer: customerReducer,
  product: productReducer,
  order: orderReducer,
  lineItem: lineItemReducer
};

export const appMetaReducers: MetaReducer<AppState>[] = !environment.production
  ? [storeFreeze]
  : [];
