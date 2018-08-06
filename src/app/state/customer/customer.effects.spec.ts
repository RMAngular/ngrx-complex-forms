import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { Observable, EMPTY } from 'rxjs';

import { CustomerEffects } from './customer.effects';
import { CustomerService } from '@core/services/customer.service';

export class TestActions extends Actions {
  constructor() {
    super(EMPTY);
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('CustomerService', () => {
  let actions$: Observable<any>;
  let effects: CustomerEffects;
  let customerService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CustomerEffects,
        {
          provide: CustomerService,
          useValue: { load: jest.fn() }
        },
        {
          provide: Actions,
          useFactory: getActions
        }
      ]
    });

    effects = TestBed.get(CustomerEffects);
    customerService = TestBed.get(CustomerService);
    actions$ = TestBed.get(Actions);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
