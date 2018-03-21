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

  @Input() customers: Customer[];
  @Input() order: Order;
  @Input() products: Product[];
  @Output() lineItemsChange = new EventEmitter<LineItem[]>();
  @Output() orderChange = new EventEmitter<Order>();

  private alive = true;
  private _customer: Customer;
  private _lineItems: LineItem[];

  @Input()
  set customer(customer: Customer) {
    this._customer = customer;
    if (this.order && customer) {
      this.order.customerId = customer.id;
    }
    this.orderChange.emit(this.order);
  }

  get customer(): Customer {
    return this._customer;
  }

  @Input()
  set lineItems(lineItems: LineItem[]) {
    this._lineItems = lineItems;
    this.lineItemsChange.emit(lineItems);
  }

  get lineItems(): LineItem[] {
    return this._lineItems;
  }

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['order'] && changes['order'].currentValue) {
      this.formGroup.patchValue(this.order);
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      id: [0, Validators.required],
      customerId: [0, Validators.required],
      lineItemIds: [[], Validators.required]
    });
    this.formGroup.valueChanges
      .pipe(takeWhile(() => this.alive), debounceTime(500))
      .subscribe(value => {
        if (!this.formGroup.valid) {
          return;
        }
        if (this.order && this.lineItems) {
          this.order.lineItemIds = this.lineItems.map(lineItem => lineItem.id);
        }
        this.lineItemsChange.emit(this.lineItems);
        this.orderChange.emit(this.order);
      });
  }
}
