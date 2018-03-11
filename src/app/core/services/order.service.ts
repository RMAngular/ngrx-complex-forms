import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap } from 'rxjs/operators';

import { Order } from '@state/order/order.model';

@Injectable()
export class OrderService {
  private ordersUrl = 'app/orders';  // URL to web api

  constructor(private httpClient: HttpClient) { }

  getOrders(): Observable<Array<Order>> {
    return this.httpClient
      .get<Order[]>(this.ordersUrl);
  }

  getOrder(id: string): Observable<Order> {
    return this.getOrders()
      .pipe(
        map(orders => orders.find(order => order.id === id))
      );
  }

  save(order: Order): Observable<Order> {
    if (order.id) {
      return this.put(order);
    }
    return this.post(order);
  }

  delete(order: Order): Observable<Order> {
    const url = `${this.ordersUrl}/${order.id}`;

    return this.httpClient.delete<void>(url)
      .pipe(
        switchMap(() => of(order))
      );
  }

  // Add new Order
  private post(order: Order): Observable<Order> {
    // Only post the name property so the in-memory service will
    //  assign a new ID
    return this.httpClient
      .post<Order>(this.ordersUrl, order);
  }

  // Update existing Order
  private put(order: Order): Observable<Order> {
    const url = `${this.ordersUrl}/${order.id}`;

    return this.httpClient
      .put(url, order)
      .pipe(
        switchMap(() => of(order))
      );
  }

}
