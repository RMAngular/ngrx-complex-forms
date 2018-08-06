import { TestBed } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { Observable, EMPTY } from 'rxjs';

import { OrderEffects } from './order.effects';
import { OrderService } from '@core/services/order.service';

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

describe('OrderService', () => {
  let actions$: Observable<any>;
  let effects: OrderEffects;
  let orderService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        OrderEffects,
        {
          provide: OrderService,
          useValue: { load: jest.fn() }
        },
        {
          provide: Actions,
          useFactory: getActions
        }
      ]
    });

    effects = TestBed.get(OrderEffects);
    orderService = TestBed.get(OrderService);
    actions$ = TestBed.get(Actions);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
