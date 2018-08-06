import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';
import { Validation } from '@core/interfaces/validation';
import { Customer } from '@state/customer/customer.model';
import { Observable , Subject } from 'rxjs';
import { debounceTime, map, takeUntil } from 'rxjs/operators';

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
  @Output() validationChange = new EventEmitter<[AbstractControl, Validation]>();

  private destroyed$ = new Subject<void>();

  constructor() {
    this.buildForm();
  }

  ngOnChanges() {
    if (this.customer) {
      this.customerFormControl.setValue(this.customer.id);
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnInit() {
    this.filteredCustomers = this.customerFormControl.valueChanges.pipe(
      takeUntil(this.destroyed$),
      debounceTime(250),
      map(name => (name ? this.filterCustomers(name) : []))
    );
    this.customerFormControl.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(() => this.emitValidationChange());
    this.emitValidationChange();
  }

  displayCustomer(id: number) {
    if (id <= 0) {
      return '';
    }
    if (this.customers === undefined) {
      return '';
    }
    const data = this.customers.find(customer => customer.id === id);
    return data ? `${data.firstName} ${data.lastName}` : '';
  }

  filterCustomers(name: string): Customer[] {
    const regex = new RegExp(`^${name}.*`, 'i');
    return this.customers.filter(customer => regex.test(customer.firstName) || regex.test(customer.lastName));
  }

  private buildForm() {
    this.customerFormControl = new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+$/)]);
    this.customerFormControl.valueChanges.pipe(takeUntil(this.destroyed$), debounceTime(250)).subscribe(value => {
      if (this.customerFormControl.invalid) {
        return;
      }
      const data = this.customers.find(customer => customer.id === value);
      this.customerChange.emit(data);
    });
  }

  private emitValidationChange() {
    this.validationChange.emit([
      this.customerFormControl,
      {
        message: 'Customer is required',
        valid: this.customerFormControl.valid
      }
    ]);
  }
}
