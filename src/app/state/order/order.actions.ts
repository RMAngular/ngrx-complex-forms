import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Order } from './order.model';

export enum OrderActionTypes {
  LoadOrdersView = '[Order] Load Orders View',
  LoadOrders = '[Order] Load Orders',
  LoadOrdersSuccess = '[Order] Load Orders Success',
  LoadOrdersFail = '[Order] Load Orders Fail',
  LoadOrder = '[Order] Load Order',
  LoadOrderSuccess = '[Order] Load Order Success',
  LoadOrderFail = '[Order] Load Order Fail',
  AddOrder = '[Order] Add Order',
  SelectOrder = '[Order] Select Order',
  UpsertOrder = '[Order] Upsert Order',
  AddOrders = '[Order] Add Orders',
  UpsertOrders = '[Order] Upsert Orders',
  UpdateOrder = '[Order] Update Order',
  UpdateOrders = '[Order] Update Orders',
  DeleteOrder = '[Order] Delete Order',
  DeleteOrders = '[Order] Delete Orders',
  ClearOrders = '[Order] Clear Orders'
}

export class LoadOrdersView implements Action {
  readonly type = OrderActionTypes.LoadOrdersView;
}

export class LoadOrders implements Action {
  readonly type = OrderActionTypes.LoadOrders;
}

export class LoadOrdersSuccess implements Action {
  readonly type = OrderActionTypes.LoadOrdersSuccess;

  constructor(public payload: { orders: Order[] }) { }
}

export class LoadOrdersFail implements Action {
  readonly type = OrderActionTypes.LoadOrdersFail;
}

export class LoadOrder implements Action {
  readonly type = OrderActionTypes.LoadOrder;

  constructor(public payload: { id: string }) { }
}

export class LoadOrderSuccess implements Action {
  readonly type = OrderActionTypes.LoadOrderSuccess;

  constructor(public payload: { order: Order }) { }
}

export class LoadOrderFail implements Action {
  readonly type = OrderActionTypes.LoadOrderFail;
}

export class SelectOrder implements Action {
  readonly type = OrderActionTypes.SelectOrder;

  constructor(public payload: { order: Order }) { }
}

export class AddOrder implements Action {
  readonly type = OrderActionTypes.AddOrder;

  constructor(public payload: { order: Order }) { }
}

export class UpsertOrder implements Action {
  readonly type = OrderActionTypes.UpsertOrder;

  constructor(public payload: { order: Update<Order> }) { }
}

export class AddOrders implements Action {
  readonly type = OrderActionTypes.AddOrders;

  constructor(public payload: { orders: Order[] }) { }
}

export class UpsertOrders implements Action {
  readonly type = OrderActionTypes.UpsertOrders;

  constructor(public payload: { orders: Update<Order>[] }) { }
}

export class UpdateOrder implements Action {
  readonly type = OrderActionTypes.UpdateOrder;

  constructor(public payload: { order: Update<Order> }) { }
}

export class UpdateOrders implements Action {
  readonly type = OrderActionTypes.UpdateOrders;

  constructor(public payload: { orders: Update<Order>[] }) { }
}

export class DeleteOrder implements Action {
  readonly type = OrderActionTypes.DeleteOrder;

  constructor(public payload: { id: string }) { }
}

export class DeleteOrders implements Action {
  readonly type = OrderActionTypes.DeleteOrders;

  constructor(public payload: { ids: string[] }) { }
}

export class ClearOrders implements Action {
  readonly type = OrderActionTypes.ClearOrders;
}

export type OrderActions =
  LoadOrders
  | LoadOrdersSuccess
  | LoadOrdersFail
  | LoadOrder
  | LoadOrderSuccess
  | LoadOrderFail
  | SelectOrder
  | AddOrder
  | UpsertOrder
  | AddOrders
  | UpsertOrders
  | UpdateOrder
  | UpdateOrders
  | DeleteOrder
  | DeleteOrders
  | ClearOrders;
