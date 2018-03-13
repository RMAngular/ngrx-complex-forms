import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { debounceTime, takeWhile, skip } from 'rxjs/operators';

import { Product } from '@state/product/product.model';
import { AppValidators } from '@core/validators/app.validator';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnChanges, OnDestroy {
  formGroup: FormGroup;
  @Input() product: Product;
  @Output() productChange = new EventEmitter<Product>();
  @Output() productValid = new EventEmitter<boolean>();

  private alive = true;

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.product && changes['product'].isFirstChange()) {
      this.formGroup.patchValue(this.product);
    }
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private buildForm() {
    this.formGroup = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required, AppValidators.validateCurrency]
    });
    this.formGroup.valueChanges
      .pipe(takeWhile(() => this.alive), skip(1), debounceTime(500))
      .subscribe(value => {
        this.productValid.emit(this.formGroup.valid);
        if (!this.formGroup.valid) {
          return;
        }
        this.productChange.emit({
          ...this.product,
          ...value
        });
      });
  }
}
