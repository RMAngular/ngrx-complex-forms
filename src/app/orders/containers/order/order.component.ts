import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

import * as fromStore from '@state/order/order.reducer';
import { Order } from '@state/order/order.model';

@Component({
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  order: Observable<Order>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<fromStore.State>
  ) {}

  ngOnInit() {
    // // todo: get order from store
    // this.order = this.activatedRoute.paramMap
    //   .pipe(
    //     switchMap(params => this.store.select(LoadOrder({ id: params.get('id') })))
    //   );
  }
}
