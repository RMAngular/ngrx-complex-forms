import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, tap } from 'rxjs/operators';

import { AppState } from '@state/app.interfaces';
import * as fromStore from '@state/product';
import { Product } from '@state/product/product.model';
import { LoadProduct, UpdateProduct } from '@state/product/product.actions';

@Component({
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  product$: Observable<Product>;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.product$ = this.activatedRoute.paramMap.pipe(
      map(params => params.get('id')),
      tap(id => this.store.dispatch(new LoadProduct({ id: +id }))),
      switchMap(() => this.store.pipe(select(fromStore.getSelectedProduct)))
    );
  }

  onProductChange(product: Product) {
    const update: Update<Product> = {
      id: product.id,
      changes: product
    };
    this.store.dispatch(new UpdateProduct({ product: update }));
  }
}
