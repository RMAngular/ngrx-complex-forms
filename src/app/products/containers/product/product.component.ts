import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { filter, map, switchMap, tap, takeWhile } from 'rxjs/operators';


import { AppState } from '@state/app.interfaces';
import * as fromStore from '@state/product';
import { Product } from '@state/product/product.model';
import { LoadProduct } from '@state/product/product.actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product$: Observable<Product>;

  constructor(private router: Router,
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.product$ = this.activatedRoute.paramMap.pipe(
      map(params => params.get('id')),
      tap(id => this.store.dispatch(new LoadProduct({ id: id }))),
      switchMap(() => this.store.pipe(select(fromStore.getSelectedProduct)))
    );

    const products$ = this.store.pipe(select(fromStore.getAllProducts));
  }

}
