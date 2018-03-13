import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output
} from '@angular/core';
import { FormArray, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, takeWhile } from 'rxjs/operators';

import { LineItem } from '@state/line-item/line-item.model';
import { Product } from '@state/product/product.model';

@Component({
  selector: 'app-order-lineitems-table',
  templateUrl: './order-lineitems-table.component.html',
  styleUrls: ['./order-lineitems-table.component.scss']
})
export class OrderLineitemsTableComponent implements OnChanges, OnDestroy {
  displayedColumns = ['index', 'product', 'quantity', 'total'];
  formGroup: FormGroup;
  @Input() lineItems: LineItem[];
  @Output() lineItemsChange = new EventEmitter<LineItem[]>();
  @Input() products: Product[];

  private alive = true;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnChanges() {
    if (this.lineItems) {
      this.lineItems.forEach(lineItem => this.addLineItem(lineItem));
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  addLineItem(lineItem?: LineItem) {
    const lineItems = <FormArray>this.formGroup.get('lineItems');
    lineItems.push(this.initLineItem(lineItem));
  }

  calculateLineItemTotal(lineItem: LineItem): number {
    // verify lineItem
    if (!lineItem) {
      return 0;
    }

    // get productId and quantity values
    const lineItems = <FormArray>this.formGroup.get('lineItems');
    const index = this.lineItems
      .map(lineItem => lineItem.id)
      .indexOf(lineItem.id);
    const productId = +lineItems.at(index).get('productId').value;
    const quantity = +lineItems.at(index).get('quantity').value;

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

  removeLineItem(i: number) {
    const lineItems = <FormArray>this.formGroup.get('lineItems');
    lineItems.removeAt(i);
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      lineItems: this.formBuilder.array([])
    });

    this.formGroup.valueChanges
      .pipe(takeWhile(() => this.alive), debounceTime(500))
      .subscribe(value => {
        if (!this.formGroup.valid) {
          return;
        }
        debugger;
        const lineItems = <FormArray>this.formGroup.get('lineItems');
        this.lineItemsChange.emit(lineItems.value);
      });
  }

  private initLineItem(lineItem?: LineItem): FormGroup {
    return this.formBuilder.group({
      productId: [lineItem ? lineItem.productId : 0, Validators.required],
      quantity: [lineItem ? lineItem.quantity : 0, Validators.required]
    });
  }
}
