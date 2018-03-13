import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormArray,
  Validators,
  FormControl
} from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { debounceTime, takeWhile } from 'rxjs/operators';
import { clone } from 'ramda';

import { Order } from '@state/order/order.model';
import { Customer } from '@state/customer/customer.model';
import { LineItem } from '@state/line-item/line-item.model';
import { Product } from '@state/product/product.model';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnChanges, OnDestroy {
  /**
   *  formGroup = {
   *    lineItems: [
   *      {
   *        productId
   *        quantity
   *      },
   *      {
   *        productId
   *        quantity
   *      }
   *    ]
   *  }
   */
  formGroup: FormGroup;

  @Input() order: Order;
  @Input() customer: Customer;
  @Input() customers: Customer[];
  @Input() lineItems: LineItem[];
  @Input() products: Product[];
  @Output() orderChange = new EventEmitter<Order>();

  private alive = true;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  get customerFormControl(): FormControl {
    return this.formGroup.get('customerId') as FormControl;
  }

  get lineItemsFormArray(): FormArray {
    return this.formGroup.get('lineItems') as FormArray;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['lineItems'] !== undefined &&
      changes['lineItems'].currentValue.length > 0
    ) {
      this.removeLineItems();
      this.lineItems.forEach(lineItem => this.addLineItem(lineItem));
      debugger;
    }
    if (this.order) {
      this.formGroup.patchValue(this.order);
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  addLineItem(lineItem?: LineItem) {
    this.lineItemsFormArray.push(this.initLineItem(lineItem));
  }

  addLineItems(lineItems: LineItem[]) {
    lineItems.forEach(lineItem => this.addLineItem(lineItem));
  }

  removeLineItemAt(i: number) {
    this.lineItemsFormArray.removeAt(i);
  }

  removeLineItems() {
    while (this.lineItemsFormArray.length > 0)
      this.lineItemsFormArray.removeAt(this.lineItemsFormArray.length - 1);
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      id: [0, Validators.required],
      customerId: [0, Validators.required],
      lineItems: this.formBuilder.array([])
    });

    this.formGroup.valueChanges
      .pipe(takeWhile(() => this.alive), debounceTime(500))
      .subscribe(value => {
        if (!this.formGroup.valid) {
          return;
        }
        const order: Order = {
          id: this.formGroup.get('id').value,
          customerId: this.formGroup.get('customerId').value,
          lineItemIds: value.lineItems.map((lineItem: LineItem) => lineItem.id)
        };
        this.orderChange.emit(order);
      });
  }

  private initLineItem(lineItem?: LineItem): FormGroup {
    return this.formBuilder.group({
      id: [lineItem ? lineItem.id : 0],
      productId: [lineItem ? lineItem.productId : 0, Validators.required],
      quantity: [lineItem ? lineItem.quantity : 0, Validators.required]
    });
  }
}
