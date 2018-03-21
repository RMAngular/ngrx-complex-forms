import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { debounceTime, map, takeWhile } from 'rxjs/operators';

import { Customer } from '@state/customer/customer.model';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnChanges, OnDestroy, OnInit {
  customerFormControl: FormControl;
  filteredCustomers: Observable<Customer[]>;
  @Input() customer: Customer;
  @Input() customers: Customer[];
  @Output() customerChange = new EventEmitter<Customer>();

  private alive = true;

  constructor() {
    this.buildForm();
  }

  ngOnChanges() {
    if (this.customer) {
      this.customerFormControl.setValue(this.customer.id);
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  ngOnInit() {
    this.filteredCustomers = this.customerFormControl.valueChanges.pipe(
      debounceTime(250),
      map(name => (name ? this.filterCustomers(name) : []))
    );
  }

  displayCustomer(id: number) {
    if (id <= 0) {
      return '';
    }
    if (this.customers === undefined) {
      return '';
    }
    const customer = this.customers.find(customer => customer.id === id);
    if (customer === undefined) {
      return '';
    }
    return `${customer.firstName} ${customer.lastName}`;
  }

  filterCustomers(name: string): Customer[] {
    const regex = new RegExp(`^${name}.*`, 'i');
    return this.customers.filter(
      customer =>
        regex.test(customer.firstName) || regex.test(customer.lastName)
    );
  }

  private buildForm() {
    this.customerFormControl = new FormControl();
    this.customerFormControl.valueChanges
      .pipe(takeWhile(() => this.alive), debounceTime(250))
      .subscribe(value => {
        if (this.customerFormControl.invalid) {
          return;
        }
        const customer = this.customers.find(customer => customer.id === value);
        this.customerChange.emit(customer);
      });
  }
}
