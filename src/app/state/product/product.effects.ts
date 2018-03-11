import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { Product } from './product.model';
import { ProductActionTypes, LoadProductsSuccess, LoadProductsFail } from './product.actions';
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

  constructor(private actions$: Actions,
    private service: ProductService) { }
}
