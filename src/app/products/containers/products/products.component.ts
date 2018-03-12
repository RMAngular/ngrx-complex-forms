import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Router } from '@angular/router';

import { AppState } from '@state/app.interfaces';
import * as fromStore from '@state/product';
import { Product } from '@state/product/product.model';
import { LoadProducts } from '@state/product/product.actions';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products$: Observable<Product[]>;

  constructor(private router: Router, private store: Store<AppState>) { }

  ngOnInit() {
    this.store.dispatch(new LoadProducts());

    const products$ = this.store.pipe(select(fromStore.getAllProducts));
  }

}
