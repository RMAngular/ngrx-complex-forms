import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';

import { CustomerEffects } from './customer.effects';

describe('CustomerService', () => {
  let actions$: Observable<any>;
  let effects: CustomerEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomerEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(CustomerEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
