import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTable } from '@angular/material';
import { Validation } from '@core/interfaces/validation';
import { LineItem } from '@state/line-item/line-item.model';
import { Product } from '@state/product/product.model';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

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
  @Output() validationChange = new EventEmitter<[AbstractControl, Validation]>();
  @Output() validationDelete = new EventEmitter<AbstractControl>();
  @ViewChild(MatTable) private matTable: MatTable<any>;

  get lineItemsFormArray(): FormArray {
    return this.formGroup.get('lineItems') as FormArray;
  }

  private destroyed$ = new Subject<void>();

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
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

    // verify productId and quantity
    if (!productId || !quantity) {
      return 0;
    }

    // find product
    const data = this.products.find(product => product.id === productId);

    return data ? data.price * quantity : 0;
  }

  onAddLineItemClick() {
    this.addLineItemFormGroup();
  }

  onRemoveLineItemClick(i: number) {
    this.removeLineItemFormGroupAt(i);
  }

  private addLineItemFormGroup(lineItem?: LineItem) {
    this.lineItemsFormArray.push(this.getLineItemFormGroup(lineItem, this.lineItemsFormArray.length + 1));
    this.matTable.renderRows();
  }

  private addLineItemFormGroups(lineItems: LineItem[]) {
    lineItems.forEach(lineItem => this.addLineItemFormGroup(lineItem));
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      lineItems: this.formBuilder.array([])
    });
    this.formGroup.valueChanges.pipe(takeUntil(this.destroyed$), debounceTime(500)).subscribe(value => {
      if (!this.formGroup.valid) {
        return;
      }
      const lineItems: LineItem[] = value.lineItems.map(lineItem => {
        return {
          ...lineItem,
          quantity: +lineItem.quantity
        };
      });
      this.lineItemsChange.emit(lineItems);
    });
    this.formGroup.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(() => {
      const lineItems = this.formGroup.get('lineItems') as FormArray;
      lineItems.controls.forEach((formGroup: FormGroup, index: number) => {
        this.validationChange.emit([
          formGroup.get('productId'),
          {
            message: `Product is required for line item #${index + 1}`,
            valid: formGroup.get('productId').valid
          }
        ]);
        this.validationChange.emit([
          formGroup.get('quantity'),
          {
            message: `Quantity is required for line item #${index + 1}`,
            valid: formGroup.get('quantity').valid
          }
        ]);
      });
    });
  }

  private getLineItemFormGroup(lineItem: LineItem, index: number): FormGroup {
    return this.formBuilder.group({
      id: [lineItem ? lineItem.id : undefined],
      productId: [lineItem ? lineItem.productId : undefined, [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      quantity: [lineItem ? lineItem.quantity : 0, [Validators.required, Validators.min(1)]]
    });
  }

  private populateForm() {
    this.removeLineItemFormGroups();
    this.addLineItemFormGroups(this.lineItems);
  }

  private removeLineItemFormGroupAt(i: number) {
    const formGroup = this.lineItemsFormArray.at(i) as FormGroup;
    this.validationDelete.emit(formGroup.get('productId'));
    this.validationDelete.emit(formGroup.get('quantity'));
    this.lineItemsFormArray.removeAt(i);
    this.matTable.renderRows();
  }

  private removeLineItemFormGroups() {
    while (this.lineItemsFormArray.controls.length > 0) {
      this.lineItemsFormArray.removeAt(this.lineItemsFormArray.controls.length - 1);
    }

    this.matTable.renderRows();
  }
}
