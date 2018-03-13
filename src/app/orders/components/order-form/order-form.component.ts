import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  OnInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { takeWhile, skip, debounceTime } from 'rxjs/operators';

import { Order } from '@state/order/order.model';
import { Customer } from '@state/customer/customer.model';
import { LineItem } from '@state/line-item/line-item.model';
import { Product } from '@state/product/product.model';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit, OnChanges, OnDestroy {
  formGroup: FormGroup;
  @Input() order: Order;
  @Input() customer: Customer;
  @Input() lineItems: LineItem[];
  @Input() products: Product[];
  @Output() orderChange = new EventEmitter<Order>();

  private alive = true;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.order && changes['order'].isFirstChange() && this.formGroup) {
      this.formGroup.patchValue(this.order);
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      customerId: ['', Validators.required],
      lineItems: this.formBuilder.array([
      ])
    });

    if (this.lineItems) {
      this.lineItems.forEach((lineItem) => this.addLineItem(lineItem));
    }

    this.formGroup.valueChanges
      .pipe(takeWhile(() => this.alive), skip(1), debounceTime(500))
      .subscribe(value => {
        if (!this.formGroup.valid) {
          return;
        }
        this.orderChange.emit({
          ...this.order,
          ...value
        });
      });
  }

  initLineItem(lineItem?: LineItem) {
    return this.formBuilder.group({
      productId: [lineItem ? lineItem.productId : '', Validators.required],
      quantity: [lineItem ? lineItem.quantity : '', Validators.required]
    });
  }

  addLineItem(lineItem?: LineItem) {
    const control = <FormArray>this.formGroup.controls['lineItems'];
    control.push(this.initLineItem(lineItem));
  }

  removeLineItem(i: number) {
    const control = <FormArray>this.formGroup.controls['lineItems'];
    control.removeAt(i);
  }

  getTotal() {
    return 0;
  }
}
