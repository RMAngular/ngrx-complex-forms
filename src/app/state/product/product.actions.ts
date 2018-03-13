import { Action } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Product } from './product.model';

export enum ProductActionTypes {
  LoadProducts = '[Product] Load Products',
  LoadProductsSuccess = '[Product] Load Products Success',
  LoadProductsFail = '[Product] Load Products Fail',
  LoadProduct = '[Product] Load Product',
  LoadProductSuccess = '[Product] Load Product Success',
  LoadProductFail = '[Product] Load Product Fail',
  SelectProduct = '[Product] Select product',
  AddProduct = '[Product] Add Product',
  AddProductFail = '[Product] Add Product Fail',
  AddProductSuccess = '[Product] Add Product Success',
  UpsertProduct = '[Product] Upsert Product',
  AddProducts = '[Product] Add Products',
  UpsertProducts = '[Product] Upsert Products',
  UpdateProduct = '[Product] Update Product',
  UpdateProductFail = '[Product] Update Product Fail',
  UpdateProductSuccess = '[Product] Update Product Success',
  UpdateProducts = '[Product] Update Products',
  DeleteProduct = '[Product] Delete Product',
  DeleteProductFail = '[Product] Delete Product Fail',
  DeleteProductSuccess = '[Product] Delete Product Success',
  DeleteProducts = '[Product] Delete Products',
  ClearProducts = '[Product] Clear Products'
}

export class LoadProducts implements Action {
  readonly type = ProductActionTypes.LoadProducts;
}

export class LoadProductsSuccess implements Action {
  readonly type = ProductActionTypes.LoadProductsSuccess;

  constructor(public payload: { products: Product[] }) {}
}

export class LoadProductsFail implements Action {
  readonly type = ProductActionTypes.LoadProductsFail;
}

export class LoadProduct implements Action {
  readonly type = ProductActionTypes.LoadProduct;

  constructor(public payload: { id: number }) {}
}

export class LoadProductSuccess implements Action {
  readonly type = ProductActionTypes.LoadProductSuccess;

  constructor(public payload: { product: Product }) {}
}

export class LoadProductFail implements Action {
  readonly type = ProductActionTypes.LoadProductFail;
}

export class SelectProduct implements Action {
  readonly type = ProductActionTypes.SelectProduct;

  constructor(public payload: { product: Product }) {}
}

export class AddProduct implements Action {
  readonly type = ProductActionTypes.AddProduct;

  constructor(public payload: { product: Product }) {}
}

export class AddProductFail implements Action {
  readonly type = ProductActionTypes.AddProductFail;
}

export class AddProductSuccess implements Action {
  readonly type = ProductActionTypes.AddProductSuccess;

  constructor(public payload: { product: Product }) {}
}

export class UpsertProduct implements Action {
  readonly type = ProductActionTypes.UpsertProduct;

  constructor(public payload: { product: Update<Product> }) {}
}

export class AddProducts implements Action {
  readonly type = ProductActionTypes.AddProducts;

  constructor(public payload: { products: Product[] }) {}
}

export class UpsertProducts implements Action {
  readonly type = ProductActionTypes.UpsertProducts;

  constructor(public payload: { products: Update<Product>[] }) {}
}

export class UpdateProduct implements Action {
  readonly type = ProductActionTypes.UpdateProduct;

  constructor(public payload: { product: Update<Product> }) {}
}

export class UpdateProductFail implements Action {
  readonly type = ProductActionTypes.UpdateProductFail;
}

export class UpdateProductSuccess implements Action {
  readonly type = ProductActionTypes.UpdateProductSuccess;

  constructor(public payload: { product: Product }) {}
}

export class UpdateProducts implements Action {
  readonly type = ProductActionTypes.UpdateProducts;

  constructor(public payload: { products: Update<Product>[] }) {}
}

export class DeleteProduct implements Action {
  readonly type = ProductActionTypes.DeleteProduct;

  constructor(public payload: { product: Product }) {}
}

export class DeleteProductFail implements Action {
  readonly type = ProductActionTypes.DeleteProductFail;
}

export class DeleteProductSuccess implements Action {
  readonly type = ProductActionTypes.DeleteProductSuccess;

  constructor(public payload: { product: Product }) {}
}

export class DeleteProducts implements Action {
  readonly type = ProductActionTypes.DeleteProducts;

  constructor(public payload: { ids: number[] }) {}
}

export class ClearProducts implements Action {
  readonly type = ProductActionTypes.ClearProducts;
}

export type ProductActions =
  | LoadProducts
  | LoadProductsSuccess
  | LoadProductsFail
  | LoadProduct
  | LoadProductSuccess
  | LoadProductFail
  | SelectProduct
  | AddProduct
  | AddProductFail
  | AddProductSuccess
  | UpsertProduct
  | AddProducts
  | UpsertProducts
  | UpdateProduct
  | UpdateProducts
  | DeleteProduct
  | DeleteProductFail
  | DeleteProductSuccess
  | DeleteProducts
  | ClearProducts;
