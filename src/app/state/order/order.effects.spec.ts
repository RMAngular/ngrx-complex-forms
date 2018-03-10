import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';

import { OrderEffects } from './order.effects';

describe('OrderService', () => {
  let actions$: Observable<any>;
  let effects: OrderEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(OrderEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
