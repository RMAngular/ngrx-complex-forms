import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store, select } from '@ngrx/store';
import { Observable , of } from 'rxjs';
import {
  map,
  switchMap,
  catchError,
  withLatestFrom,
  tap
} from 'rxjs/operators';

import { Product } from './product.model';
import {
  ProductActionTypes,
  AddProduct,
  AddProductFail,
  AddProductSuccess,
  DeleteProduct,
  DeleteProductFail,
  DeleteProductSuccess,
  LoadProductsSuccess,
  LoadProductsFail,
  LoadProduct,
  LoadProductSuccess,
  LoadProductFail,
  UpdateProduct,
  UpdateProductFail,
  UpdateProductSuccess
} from './product.actions';
import { AppState } from '@state/app.interfaces';
import * as fromStore from './';
import { ProductService } from '@core/services/product.service';

@Injectable()
export class ProductEffects {
  @Effect()
  add: Observable<Action> = this.actions$
    .ofType<AddProduct>(ProductActionTypes.AddProduct)
    .pipe(
      switchMap(action => this.service.save(action.payload.product)),
      map((product: Product) => new AddProductSuccess({ product: product })),
      catchError(err => of(new AddProductFail()))
    );

  @Effect({
    dispatch: false
  })
  addSuccess: Observable<Action> = this.actions$
    .ofType<AddProductSuccess>(ProductActionTypes.AddProductSuccess)
    .pipe(tap(() => this.router.navigate(['products'])));

  @Effect()
  delete: Observable<Action> = this.actions$
    .ofType<DeleteProduct>(ProductActionTypes.DeleteProduct)
    .pipe(
      switchMap(action => this.service.delete(action.payload.product)),
      map((product: Product) => new DeleteProductSuccess({ product: product })),
      catchError(err => of(new DeleteProductFail()))
    );

  @Effect()
  load: Observable<Action> = this.actions$
    .ofType(ProductActionTypes.LoadProducts)
    .pipe(
      switchMap(() => this.service.getProducts()),
      map(
        (products: Product[]) => new LoadProductsSuccess({ products: products })
      ),
      catchError(err => of(new LoadProductsFail()))
    );

  @Effect()
  loadById: Observable<Action> = this.actions$
    .ofType<LoadProduct>(ProductActionTypes.LoadProduct)
    .pipe(
      switchMap(action => this.service.getProduct(action.payload.id)),
      map((product: Product) => new LoadProductSuccess({ product: product })),
      catchError(err => of(new LoadProductFail()))
    );

  @Effect()
  update: Observable<Action> = this.actions$
    .ofType<UpdateProduct>(ProductActionTypes.UpdateProduct)
    .pipe(
      withLatestFrom(this.store.pipe(select(fromStore.getSelectedProduct))),
      switchMap(([action, product]) => this.service.save(product)),
      map((product: Product) => new UpdateProductSuccess({ product: product })),
      catchError(err => of(new UpdateProductFail()))
    );

  constructor(
    private actions$: Actions,
    private router: Router,
    private service: ProductService,
    private store: Store<AppState>
  ) {}
}
