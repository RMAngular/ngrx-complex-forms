import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '@state/app.interfaces';
import * as fromCustomerStore from '@state/customer';
import { Customer } from '@state/customer/customer.model';
import * as fromLineItemStore from '@state/line-item';
import { LineItem } from '@state/line-item/line-item.model';
import * as fromStore from '@state/order';
import { ClearSelectedOrder, DeleteOrder, LoadOrdersView, SelectOrder } from '@state/order/order.actions';
import { Order, OrderView } from '@state/order/order.model';
import * as fromProductStore from '@state/product';
import { Product } from '@state/product/product.model';
import { Observable, combineLatest } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders$: Observable<OrderView[]>;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(new LoadOrdersView());

    this.orders$ = combineLatest(
      this.store.pipe(select(fromStore.getAllOrders)),
      this.store.pipe(select(fromCustomerStore.getCustomerEntities)),
      this.store.pipe(select(fromLineItemStore.getLineItemEntities)),
      this.store.pipe(select(fromProductStore.getProductEntities))
    ).pipe(
      filter(([orders, customers, lineItems, products]) => !!orders && !!customers && !!lineItems && !!products),
      map(([orders, customers, lineItems, products]) => {
        return orders.map(order => {
          const c: Customer = customers[order.customerId],
            l: LineItem[] = [],
            p: Product[] = [];

          // find the line items
          order.lineItemIds.forEach(id => {
            if (lineItems[id]) {
              l.push(lineItems[id]);
            }
          });

          // find the products
          l.forEach(lineItem => {
            if (products[lineItem.productId]) {
              p.push(products[lineItem.productId]);
            }
          });

          return { order: order, customer: c, lineItems: l, products: p };
        });
      })
    );
  }

  onAddOrder() {
    this.store.dispatch(new ClearSelectedOrder());
    this.router.navigateByUrl('/orders/add');
  }

  onDeleteOrder(order: Order) {
    this.store.dispatch(new DeleteOrder({ id: order.id }));
  }

  onEditOrder(order: Order) {
    this.store.dispatch(new SelectOrder({ order: order }));
    this.router.navigate(['orders', order.id]);
  }
}
