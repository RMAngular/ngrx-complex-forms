import { TestBed, inject } from '@angular/core/testing';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';

import { cold, hot } from 'jasmine-marbles';
import { empty } from 'rxjs/observable/empty';

import { ProductEffects } from './product.effects';
import { ProductService } from '@core/services/product.service';

export class TestActions extends Actions {
  constructor() {
    super(empty());
  }

  set stream(source: Observable<any>) {
    this.source = source;
  }
}

export function getActions() {
  return new TestActions();
}

describe('ProductService', () => {
  let actions$: Observable<any>;
  let effects: ProductEffects;
  let productService: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductEffects,
        {
          provide: ProductService,
          useValue: { load: jest.fn() }
        },
        {
          provide: Actions,
          useFactory: getActions
        }
      ]
    });

    effects = TestBed.get(ProductEffects);
    productService = TestBed.get(ProductService);
    actions$ = TestBed.get(Actions);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
