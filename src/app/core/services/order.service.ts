import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '@state/order/order.model';
import { Observable , of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class OrderService {
  private ordersUrl = 'app/orders'; // URL to web api

  constructor(private httpClient: HttpClient) {}

  getOrders(): Observable<Array<Order>> {
    return this.httpClient.get<Order[]>(this.ordersUrl);
  }

  getOrder(id: number): Observable<Order> {
    return this.getOrders().pipe(map(orders => orders.find(order => order.id === id)));
  }

  save(order: Order): Observable<Order> {
    if (order.id) {
      return this.put(order);
    }
    return this.post(order);
  }

  delete(id: number): Observable<number> {
    return this.httpClient.delete<void>(`${this.ordersUrl}/${id}`).pipe(switchMap(() => of(id)));
  }

  // Add new Order
  private post(order: Order): Observable<Order> {
    // Only post the name property so the in-memory service will
    //  assign a new ID
    return this.httpClient.post<Order>(this.ordersUrl, order);
  }

  // Update existing Order
  private put(order: Order): Observable<Order> {
    return this.httpClient.put<void>(`${this.ordersUrl}/${order.id}`, order).pipe(switchMap(() => of(order)));
  }
}
