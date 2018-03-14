import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { AppState } from '@state/app.interfaces';
import * as fromStore from '@state/product';
import { Product } from '@state/product/product.model';
import {
  DeleteProduct,
  LoadProducts,
  SelectProduct
} from '@state/product/product.actions';

@Component({
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new LoadProducts());
    this.products$ = this.store.pipe(select(fromStore.getAllProducts));
  }

  onDeleteProduct(product: Product) {
    this.store.dispatch(new DeleteProduct({ product: product }));
  }

  onEditProduct(product: Product) {
    this.store.dispatch(new SelectProduct({ product: product }));
    this.router.navigate(['products', product.id]);
  }
}
