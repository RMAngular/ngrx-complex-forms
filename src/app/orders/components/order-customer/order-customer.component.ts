import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { debounceTime, map, startWith } from 'rxjs/operators';

import { Customer } from '@state/customer/customer.model';

@Component({
  selector: 'app-order-customer',
  templateUrl: './order-customer.component.html',
  styleUrls: ['./order-customer.component.scss']
})
export class OrderCustomerComponent implements OnChanges, OnInit {
  filteredCustomers: Observable<Customer[]>;
  @Input() customer: Customer;
  @Input() customerFormControl: FormControl;
  @Input() customers: Customer[];

  constructor() {}

  ngOnChanges() {
    if (this.customer) {
      this.customerFormControl.setValue(this.customer.id);
    }
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
}
