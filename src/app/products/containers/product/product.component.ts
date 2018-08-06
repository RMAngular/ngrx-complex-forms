import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Update } from '@ngrx/entity';
import { Observable } from 'rxjs/Observable';
import { filter, map, switchMap, tap } from 'rxjs/operators';

import { AppState } from '@state/app.interfaces';
import * as fromStore from '@state/product';
import { Product } from '@state/product/product.model';
import {
  AddProduct,
  LoadProduct,
  UpdateProduct
} from '@state/product/product.actions';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  product$: Observable<Product>;

  private product: Product;
  private valid: boolean;
  showErrors: boolean;

  constructor(
    private store: Store<AppState>,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.product$ = this.activatedRoute.paramMap.pipe(
      filter(params => params.has('id')),
      map(params => params.get('id')),
      tap(id => this.store.dispatch(new LoadProduct({ id: +id }))),
      switchMap(() => this.store.pipe(select(fromStore.getSelectedProduct)))
    );

    this.showErrors = false;
  }

  onProductChange(value: { product: Product, valid: boolean }) {
    this.product = value.product;
    this.valid = value.valid;
  }

  onSave() {
    this.showErrors = true;

    if (this.valid) {
      if (this.product.id) {
        this.updateProduct(this.product);
      } else {
        this.addProduct(this.product);
      }
    }
  }

  private addProduct(product: Product) {
    this.store.dispatch(new AddProduct({ product: product }));
  }

  private updateProduct(product: Product) {
    const update: Update<Product> = {
      id: product.id,
      changes: product
    };
    this.store.dispatch(new UpdateProduct({ product: update }));
  }
}
