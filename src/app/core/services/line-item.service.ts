import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap } from 'rxjs/operators';

import { LineItem } from '@state/line-item/line-item.model';

@Injectable()
export class LineItemService {
  private lineItemsUrl = 'app/lineItems';  // URL to web api

  constructor(private httpClient: HttpClient) { }

  getLineItems(): Observable<Array<LineItem>> {
    return this.httpClient
      .get<LineItem[]>(this.lineItemsUrl);
  }

  getLineItem(id: string): Observable<LineItem> {
    return this.getLineItems()
      .pipe(
        map(lineItems => lineItems.find(lineItem => lineItem.id === id))
      );
  }

  save(lineItem: LineItem): Observable<LineItem> {
    if (lineItem.id) {
      return this.put(lineItem);
    }
    return this.post(lineItem);
  }

  delete(lineItem: LineItem): Observable<LineItem> {
    const url = `${this.lineItemsUrl}/${lineItem.id}`;

    return this.httpClient.delete<void>(url)
      .pipe(
        switchMap(() => of(lineItem))
      );
  }

  // Add new LineItem
  private post(lineItem: LineItem): Observable<LineItem> {
    // Only post the name property so the in-memory service will
    //  assign a new ID
    return this.httpClient
      .post<LineItem>(this.lineItemsUrl, lineItem);
  }

  // Update existing LineItem
  private put(lineItem: LineItem): Observable<LineItem> {
    const url = `${this.lineItemsUrl}/${lineItem.id}`;

    return this.httpClient
      .put(url, lineItem)
      .pipe(
        switchMap(() => of(lineItem))
      );
  }

}
