import { FormControl } from '@angular/forms';
import { of } from 'rxjs/observable/of';

export class AppValidators {
  static validateCurrency(formControl: FormControl) {
    const CURRENCY_REGEXP = /^[+-]?[0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{1,2})?$/;

    return of(
      CURRENCY_REGEXP.test(formControl.value)
        ? null
        : {
            validateCurrency: {
              valid: false
            }
          }
    );
  }
}
