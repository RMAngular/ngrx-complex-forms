import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { map, switchMap } from 'rxjs/operators';

import { Product } from '@state/product/product.model';

@Injectable()
export class ProductService {
  private productsUrl = 'app/products';  // URL to web api

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<Array<Product>> {
    return this.httpClient
      .get<Product[]>(this.productsUrl);
  }

  getProduct(id: string): Observable<Product> {
    return this.getProducts()
      .pipe(
        map(products => products.find(product => product.id === id))
      );
  }

  save(product: Product): Observable<Product> {
    if (product.id) {
      return this.put(product);
    }
    return this.post(product);
  }

  delete(product: Product): Observable<Product> {
    const url = `${this.productsUrl}/${product.id}`;

    return this.httpClient.delete<void>(url)
      .pipe(
        switchMap(() => of(product))
      );
  }

  // Add new Product
  private post(product: Product): Observable<Product> {
    // Only post the name property so the in-memory service will
    //  assign a new ID
    return this.httpClient
      .post<Product>(this.productsUrl, product);
  }

  // Update existing Product
  private put(product: Product): Observable<Product> {
    const url = `${this.productsUrl}/${product.id}`;

    return this.httpClient
      .put(url, product)
      .pipe(
        switchMap(() => of(product))
      );
  }
}
