import { RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './shared/utils';
import { State as customerState } from './customer/customer.reducer';
import { State as productState } from './product/product.reducer';
import { State as orderState } from './order/order.reducer';
import { State as lineItemState } from './line-item/line-item.reducer';

export interface AppState {
  router: RouterReducerState<RouterStateUrl>;
  customer: customerState;
  product: productState;
  order: orderState;
  lineItem: lineItemState;
}

export type State = AppState;
