import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { LineItem } from './line-item.model';

export enum LineItemActionTypes {
  LoadLineItems = '[LineItem] Load LineItems',
  LoadLineItemsSuccess = '[LineItem] Load LineItems Success',
  LoadLineItemsFail = '[LineItem] Load LineItems Fail',
  AddLineItem = '[LineItem] Add LineItem',
  UpsertLineItem = '[LineItem] Upsert LineItem',
  AddLineItems = '[LineItem] Add LineItems',
  UpsertLineItems = '[LineItem] Upsert LineItems',
  UpdateLineItem = '[LineItem] Update LineItem',
  UpdateLineItems = '[LineItem] Update LineItems',
  DeleteLineItem = '[LineItem] Delete LineItem',
  DeleteLineItems = '[LineItem] Delete LineItems',
  ClearLineItems = '[LineItem] Clear LineItems'
}

export class LoadLineItems implements Action {
  readonly type = LineItemActionTypes.LoadLineItems;
}

export class LoadLineItemsSuccess implements Action {
  readonly type = LineItemActionTypes.LoadLineItemsSuccess;

  constructor(public payload: { lineItems: LineItem[] }) { }
}

export class LoadLineItemsFail implements Action {
  readonly type = LineItemActionTypes.LoadLineItemsFail;
}

export class AddLineItem implements Action {
  readonly type = LineItemActionTypes.AddLineItem;

  constructor(public payload: { lineItem: LineItem }) { }
}

export class UpsertLineItem implements Action {
  readonly type = LineItemActionTypes.UpsertLineItem;

  constructor(public payload: { lineItem: Update<LineItem> }) { }
}

export class AddLineItems implements Action {
  readonly type = LineItemActionTypes.AddLineItems;

  constructor(public payload: { lineItems: LineItem[] }) { }
}

export class UpsertLineItems implements Action {
  readonly type = LineItemActionTypes.UpsertLineItems;

  constructor(public payload: { lineItems: Update<LineItem>[] }) { }
}

export class UpdateLineItem implements Action {
  readonly type = LineItemActionTypes.UpdateLineItem;

  constructor(public payload: { lineItem: Update<LineItem> }) { }
}

export class UpdateLineItems implements Action {
  readonly type = LineItemActionTypes.UpdateLineItems;

  constructor(public payload: { lineItems: Update<LineItem>[] }) { }
}

export class DeleteLineItem implements Action {
  readonly type = LineItemActionTypes.DeleteLineItem;

  constructor(public payload: { id: string }) { }
}

export class DeleteLineItems implements Action {
  readonly type = LineItemActionTypes.DeleteLineItems;

  constructor(public payload: { ids: string[] }) { }
}

export class ClearLineItems implements Action {
  readonly type = LineItemActionTypes.ClearLineItems;
}

export type LineItemActions =
  LoadLineItems
  | LoadLineItemsSuccess
  | LoadLineItemsFail
  | AddLineItem
  | UpsertLineItem
  | AddLineItems
  | UpsertLineItems
  | UpdateLineItem
  | UpdateLineItems
  | DeleteLineItem
  | DeleteLineItems
  | ClearLineItems;
