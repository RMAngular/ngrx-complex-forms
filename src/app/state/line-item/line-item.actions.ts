import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { Order } from '@state/order/order.model';
import { LineItem } from './line-item.model';

export enum LineItemActionTypes {
  AddLineItem = '[LineItem] Add LineItem',
  AddLineItemSuccess = '[LineItem] Add LineItem Success',
  AddLineItemFail = '[LineItem] Add LineItemFail',
  DeleteLineItem = '[LineItem] Delete LineItem',
  DeleteLineItemSuccess = '[LineItem] Delete LineItem Success',
  DeleteLineItemFail = '[LineItem] Delete LineItem Fail',
  LoadLineItem = '[LineItem] Load LineItem',
  LoadLineItemSuccess = '[LineItem] Load LineItem Success',
  LoadLineItemFail = '[LineItem] Load LineItem Fail',
  LoadLineItems = '[LineItem] Load LineItems',
  LoadLineItemsSuccess = '[LineItem] Load LineItems Success',
  LoadLineItemsFail = '[LineItem] Load LineItems Fail',
  UpsertLineItems = '[LineItem] Upsert LineItems',
  UpsertLineItemsSuccess = '[LineItem] Upsert LineItems Success',
  UpsertLineItemsFail = '[LineItem] Upsert LineItems Fail'
}

export class AddLineItem implements Action {
  readonly type = LineItemActionTypes.AddLineItem;

  constructor(public payload: { lineItem: LineItem }) {}
}

export class AddLineItemSuccess implements Action {
  readonly type = LineItemActionTypes.AddLineItemSuccess;

  constructor(public payload: { lineItem: LineItem }) {}
}

export class AddLineItemFail implements Action {
  readonly type = LineItemActionTypes.AddLineItemFail;
}

export class DeleteLineItem implements Action {
  readonly type = LineItemActionTypes.DeleteLineItem;

  constructor(public payload: { id: number }) {}
}

export class DeleteLineItemSuccess implements Action {
  readonly type = LineItemActionTypes.DeleteLineItemSuccess;

  constructor(public payload: { id: number }) {}
}

export class DeleteLineItemFail implements Action {
  readonly type = LineItemActionTypes.DeleteLineItemFail;
}

export class LoadLineItem implements Action {
  readonly type = LineItemActionTypes.LoadLineItem;

  constructor(public payload: { id: number }) {}
}

export class LoadLineItemSuccess implements Action {
  readonly type = LineItemActionTypes.LoadLineItemSuccess;

  constructor(public payload: { lineItem: LineItem }) {}
}

export class LoadLineItemFail implements Action {
  readonly type = LineItemActionTypes.LoadLineItemFail;
}

export class LoadLineItems implements Action {
  readonly type = LineItemActionTypes.LoadLineItems;
}

export class LoadLineItemsSuccess implements Action {
  readonly type = LineItemActionTypes.LoadLineItemsSuccess;

  constructor(public payload: { lineItems: LineItem[] }) {}
}

export class LoadLineItemsFail implements Action {
  readonly type = LineItemActionTypes.LoadLineItemsFail;
}

export class UpsertLineItems implements Action {
  readonly type = LineItemActionTypes.UpsertLineItems;

  constructor(public payload: { lineItems: LineItem[]; order: Order }) {}
}

export class UpsertLineItemsSuccess implements Action {
  readonly type = LineItemActionTypes.UpsertLineItemsSuccess;

  constructor(public payload: { lineItems: Update<LineItem>[]; order: Order }) {}
}

export class UpsertLineItemsFail implements Action {
  readonly type = LineItemActionTypes.UpsertLineItemsFail;
}

export type LineItemActions =
  | AddLineItem
  | AddLineItemSuccess
  | AddLineItemFail
  | DeleteLineItem
  | DeleteLineItemSuccess
  | DeleteLineItemFail
  | LoadLineItem
  | LoadLineItemSuccess
  | LoadLineItemFail
  | LoadLineItems
  | LoadLineItemsSuccess
  | LoadLineItemsFail
  | UpsertLineItems
  | UpsertLineItemsSuccess
  | UpsertLineItemsFail;
