import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { filter, map, switchMap, tap, takeWhile } from 'rxjs/operators';

import * as fromStore from '@state/order/order.reducer';
import { getSelectedOrder } from '@state/order';
import { LoadOrder, SelectOrder } from '@state/order/order.actions';
import { Order } from '@state/order/order.model';

@Component({
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  order$: Observable<Order>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private store: Store<fromStore.State>
  ) { }

  ngOnInit() {
    this.order$ = this.activatedRoute.paramMap.pipe(
      map(params => params.get('id')),
      tap(id => this.store.dispatch(new LoadOrder({ id: id }))),
      switchMap(() => this.store.pipe(select(getSelectedOrder)))
    );
  }
}
