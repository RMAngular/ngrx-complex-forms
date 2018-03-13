import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { AppState } from '@state/app.interfaces';
import * as fromStore from '@state/product';
import { AddProduct } from '@state/product/product.actions';
import { Product } from '@state/product/product.model';

@Component({
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent {
  private product: Product;

  constructor(private router: Router, private store: Store<AppState>) {}

  onCancel() {
    this.router.navigate(['products']);
  }

  onProductChange(product: Product) {
    this.product = product;
  }

  onSave() {
    this.store.dispatch(new AddProduct({ product: this.product }));
    // todo navigate when AddProductSuccess notification is received
  }
}
