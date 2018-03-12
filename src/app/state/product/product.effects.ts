import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Product } from './product.model';
import {
  ProductActionTypes, LoadProductsSuccess, LoadProductsFail,
  LoadProduct, LoadProductSuccess, LoadProductFail
} from './product.actions';
import { ProductService } from '../../core/services/product.service';


@Injectable()
export class ProductEffects {

  @Effect()
  load: Observable<Action> = this.actions$.ofType(ProductActionTypes.LoadProducts)
    .pipe(
      switchMap(() => this.service.getProducts()),
      map(
        (products: Product[]) => new LoadProductsSuccess({ products: products }),
        catchError(err => of(new LoadProductsFail()))
      )
    );

  @Effect()
  loadById: Observable<Action> = this.actions$.ofType<LoadProduct>(ProductActionTypes.LoadProduct)
    .pipe(
      switchMap(action => this.service.getProduct(action.payload.id)),
      map(
        (product: Product) => new LoadProductSuccess({ product: product }),
        catchError(err => of(new LoadProductFail()))
      )
    );

  constructor(private actions$: Actions,
    private service: ProductService) { }
}
