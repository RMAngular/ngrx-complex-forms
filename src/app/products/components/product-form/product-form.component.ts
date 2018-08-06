import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppValidators } from '@core/validators/app.validator';
import { Product } from '@state/product/product.model';
import { Subject } from 'rxjs';
import { debounceTime, skip, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnChanges, OnDestroy {
  formGroup: FormGroup;
  @Input() product: Product;
  @Input() showErrors: boolean;
  @Output() productChange = new EventEmitter<{ product: Product; valid: boolean }>();

  private destroyed$ = new Subject<void>();

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && changes['product'].currentValue) {
      this.formGroup.patchValue(this.product);
    }
  }

  ngOnDestroy() {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required, AppValidators.validateCurrency]
    });

    this.formGroup.valueChanges.pipe(takeUntil(this.destroyed$), skip(1), debounceTime(500)).subscribe(value => {
      this.productChange.emit({
        product: value,
        valid: this.formGroup.valid
      });
    });
  }
}
