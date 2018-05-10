import { Validation } from '@core/interfaces/validation';
import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { LineItem } from '@state/line-item/line-item.model';
import { Order } from './order.model';

export enum OrderActionTypes {
  AddOrder = '[Order] Add Order',
  AddOrderSuccess = '[Order] Add Order Success',
  AddOrderFail = '[Order] Add Order Fail',
  ClearSelectedOrder = '[Order] Clear Selected Order',
  DeleteOrder = '[Order] Delete Order',
  DeleteOrderSuccess = '[Order] Delete Order Success',
  DeleteOrderFail = '[Order] Delete Order Fail',
  LoadOrder = '[Order] Load Order',
  LoadOrderSuccess = '[Order] Load Order Success',
  LoadOrderFail = '[Order] Load Order Fail',
  LoadOrdersView = '[Order] Load Orders View',
  LoadOrders = '[Order] Load Orders',
  LoadOrdersSuccess = '[Order] Load Orders Success',
  LoadOrdersFail = '[Order] Load Orders Fail',
  SelectOrder = '[Order] Select Order',
  UpdateOrder = '[Order] Update Order',
  UpdateOrderSuccess = '[Order] Update Order Success',
  UpdateOrderFail = '[Order] Update Order Fail',
  UpdateLineItemsAndOrder = '[Order] Update LineItems and Order',
  UpdateLineItemsAndOrderSuccess = '[Order] Update LineItems and Order Success',
  UpdateLineItemsAndOrderFail = '[Order] Update LineItems and Order Fail',
  OpenOrderValidationDialog = '[Order] Open order validation dialog',
  CloseOrderValidationDialog = '[Order] Close order validation dialog'
}

export class AddOrder implements Action {
  readonly type = OrderActionTypes.AddOrder;

  constructor(public payload: { lineItems: LineItem[]; order: Order }) {}
}

export class AddOrderSuccess implements Action {
  readonly type = OrderActionTypes.AddOrderSuccess;

  constructor(public payload: { lineItems: LineItem[]; order: Order }) {}
}

export class AddOrderFail implements Action {
  readonly type = OrderActionTypes.AddOrderFail;
}

export class ClearSelectedOrder implements Action {
  readonly type = OrderActionTypes.ClearSelectedOrder;
}

export class DeleteOrder implements Action {
  readonly type = OrderActionTypes.DeleteOrder;

  constructor(public payload: { id: number }) {}
}

export class DeleteOrderSuccess implements Action {
  readonly type = OrderActionTypes.DeleteOrderSuccess;

  constructor(public payload: { id: number }) {}
}

export class DeleteOrderFail implements Action {
  readonly type = OrderActionTypes.DeleteOrderFail;
}

export class LoadOrder implements Action {
  readonly type = OrderActionTypes.LoadOrder;

  constructor(public payload: { id: number }) {}
}

export class LoadOrderSuccess implements Action {
  readonly type = OrderActionTypes.LoadOrderSuccess;

  constructor(public payload: { order: Order }) {}
}

export class LoadOrderFail implements Action {
  readonly type = OrderActionTypes.LoadOrderFail;
}

export class LoadOrdersView implements Action {
  readonly type = OrderActionTypes.LoadOrdersView;
}

export class LoadOrders implements Action {
  readonly type = OrderActionTypes.LoadOrders;
}

export class LoadOrdersSuccess implements Action {
  readonly type = OrderActionTypes.LoadOrdersSuccess;

  constructor(public payload: { orders: Order[] }) {}
}

export class LoadOrdersFail implements Action {
  readonly type = OrderActionTypes.LoadOrdersFail;
}

export class SelectOrder implements Action {
  readonly type = OrderActionTypes.SelectOrder;

  constructor(public payload: { order: Order }) {}
}

export class UpdateOrder implements Action {
  readonly type = OrderActionTypes.UpdateOrder;

  constructor(public payload: { order: Order }) {}
}

export class UpdateOrderFail implements Action {
  readonly type = OrderActionTypes.UpdateOrderFail;
}

export class UpdateOrderSuccess implements Action {
  readonly type = OrderActionTypes.UpdateOrderSuccess;

  constructor(public payload: { order: Update<Order> }) {}
}

export class UpdateLineItemsAndOrder implements Action {
  readonly type = OrderActionTypes.UpdateLineItemsAndOrder;

  constructor(public payload: { lineItems: LineItem[]; order: Order }) {}
}

export class UpdateLineItemsAndOrderSuccess implements Action {
  readonly type = OrderActionTypes.UpdateLineItemsAndOrderSuccess;

  constructor(public payload: { lineItems: LineItem[]; order: Order }) {}
}

export class UpdateLineItemsAndOrderFail implements Action {
  readonly type = OrderActionTypes.UpdateLineItemsAndOrderFail;

  constructor(public payload: { error: Error }) {}
}

export class OpenOrderValidationDialog implements Action {
  readonly type = OrderActionTypes.OpenOrderValidationDialog;

  constructor(public payload: { validations: Validation[] }) {}
}

export class CloseOrderValidationDialog implements Action {
  readonly type = OrderActionTypes.CloseOrderValidationDialog;
}

export type OrderActions =
  | AddOrder
  | AddOrderSuccess
  | AddOrderFail
  | ClearSelectedOrder
  | DeleteOrder
  | DeleteOrderSuccess
  | DeleteOrderSuccess
  | LoadOrder
  | LoadOrderSuccess
  | LoadOrderFail
  | LoadOrders
  | LoadOrdersSuccess
  | LoadOrdersFail
  | SelectOrder
  | UpdateOrder
  | UpdateOrderSuccess
  | UpdateOrderFail
  | UpdateLineItemsAndOrder
  | UpdateLineItemsAndOrderFail
  | UpdateLineItemsAndOrderSuccess
  | OpenOrderValidationDialog
  | CloseOrderValidationDialog;
