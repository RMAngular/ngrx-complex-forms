import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Product } from '@state/product/product.model';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent {
  displayedColumns = ['id', 'name', 'price'];
  @Input() products: Product[];
  @Output() productClicked = new EventEmitter<Product>();

  constructor() {}

  select(product: Product) {
    this.productClicked.emit(product);
  }
}
