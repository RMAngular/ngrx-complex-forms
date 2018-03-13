import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { MatTable } from '@angular/material';

import { LineItem } from '@state/line-item/line-item.model';
import { Product } from '@state/product/product.model';

@Component({
  selector: 'app-order-lineitems-table',
  templateUrl: './order-lineitems-table.component.html',
  styleUrls: ['./order-lineitems-table.component.scss']
})
export class OrderLineitemsTableComponent implements OnChanges {
  displayedColumns = ['index', 'product', 'quantity', 'total', 'actions'];
  @Input() lineItemsFormArray: FormArray;
  @Input() products: Product[];
  @Output() addLineItem = new EventEmitter<void>();
  @Output() removeLineItemAt = new EventEmitter<number>();

  @ViewChild(MatTable) private matTable: MatTable<any>;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['lineItemsFormArray']) {
      const current = changes['lineItemsFormArray'].currentValue;
      const prev = changes['lineItemsFormArray'].previousValue;
      debugger;
    }
  }

  calculateLineItemTotal(lineItem: FormGroup): number {
    // verify lineItem
    if (lineItem.invalid) {
      return 0;
    }

    // get productId and quantity values
    const productId = +lineItem.get('productId').value;
    const quantity = +lineItem.get('quantity').value;

    //verify productId and quantity
    if (!productId || !quantity) {
      return 0;
    }

    // find product
    const product = this.products.find(product => product.id === productId);
    if (product === undefined) {
      return 0;
    }

    return product.price * quantity;
  }

  onAddLineItemClick() {
    this.addLineItem.emit();
    this.matTable.renderRows();
  }

  onRemoveLineItemClick(i: number) {
    this.removeLineItemAt.emit(i);
    this.matTable.renderRows();
  }
}
