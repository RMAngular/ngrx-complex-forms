import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material';
import { debounceTime, takeWhile } from 'rxjs/operators';

import { LineItem } from '@state/line-item/line-item.model';
import { Product } from '@state/product/product.model';

@Component({
  selector: 'app-lineitems-table',
  templateUrl: './lineitems-table.component.html',
  styleUrls: ['./lineitems-table.component.scss']
})
export class LineitemsTableComponent implements OnDestroy, OnChanges {
  displayedColumns = ['index', 'product', 'quantity', 'total', 'actions'];
  formGroup: FormGroup;

  @Input() lineItems: LineItem[];
  @Input() products: Product[];
  @Output() lineItemsChange = new EventEmitter<LineItem[]>();
  @ViewChild(MatTable) private matTable: MatTable<any>;

  get lineItemsFormArray(): FormArray {
    return this.formGroup.get('lineItems') as FormArray;
  }

  private alive = true;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnDestroy() {
    this.alive = false;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['lineItems'] &&
      changes['lineItems'].currentValue &&
      changes['lineItems'].currentValue.length > 0 &&
      this.lineItemsFormArray.controls.length === 0
    ) {
      this.populateForm();
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
    this.addLineItemFormGroup();
  }

  onRemoveLineItemClick(i: number) {
    this.removeLineItemFormGroupAt(i);
  }

  private addLineItemFormGroup(lineItem?: LineItem) {
    this.lineItemsFormArray.push(this.getLineItemFormGroup(lineItem));
    this.matTable.renderRows();
  }

  private addLineItemFormGroups(lineItems: LineItem[]) {
    lineItems.forEach(lineItem => this.addLineItemFormGroup(lineItem));
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
        this.lineItemsChange.emit(value.lineItems);
      });
  }

  private getLineItemFormGroup(lineItem?: LineItem): FormGroup {
    return this.formBuilder.group({
      id: [lineItem ? lineItem.id : 0],
      productId: [lineItem ? lineItem.productId : 0, Validators.required],
      quantity: [lineItem ? lineItem.quantity : 0, Validators.required]
    });
  }

  private populateForm() {
    this.removeLineItemFormGroups();
    this.addLineItemFormGroups(this.lineItems);
  }

  private removeLineItemFormGroupAt(i: number) {
    this.lineItemsFormArray.removeAt(i);
    this.matTable.renderRows();
  }

  private removeLineItemFormGroups() {
    while (this.lineItemsFormArray.controls.length > 0)
      this.lineItemsFormArray.removeAt(
        this.lineItemsFormArray.controls.length - 1
      );
    this.matTable.renderRows();
  }
}
