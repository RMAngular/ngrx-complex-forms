import { Component, Input, EventEmitter, Output } from '@angular/core';

import { Product } from '@state/product/product.model';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.scss']
})
export class ProductsTableComponent {
  displayedColumns = ['id', 'name', 'price', 'actions'];
  @Input() products: Product[];
  @Output() delete = new EventEmitter<Product>();
  @Output() edit = new EventEmitter<Product>();

  constructor() {}

  onDeleteProduct(product: Product) {
    this.delete.emit(product);
  }

  onEditProduct(product: Product) {
    this.edit.emit(product);
  }
}
