import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { map, switchMap, tap } from 'rxjs/operators';

import { AppState } from '@state/app.interfaces';
import * as fromStore from '@state/product';
import { Product } from '@state/product/product.model';
import { DeleteProduct, LoadProduct } from '@state/product/product.actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
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

  delete(product: Product) {
    // todo add a confirmation window using ngrx
    this.store.dispatch(new DeleteProduct({ id: product.id }));
    this.router.navigate(['products']);
  }

  edit(product: Product) {
    this.router.navigate(['products', product.id, 'edit']);
  }
}
