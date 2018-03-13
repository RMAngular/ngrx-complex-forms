import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
export class OrderFormComponent implements OnChanges, OnDestroy {
  formGroup: FormGroup;
  @Input() order: Order;
  @Input() customer: Customer;
  @Input() lineItems: LineItem[];
  @Input() products: Product[];
  @Output() orderChange = new EventEmitter<Order>();

  private alive = true;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.order && changes['order'].isFirstChange()) {
      this.formGroup.patchValue(this.order);
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      customerId: ['', Validators.required],
      lineItems: ['', Validators.required]
    });
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

  getTotal() {
    return 0;
  }
}
