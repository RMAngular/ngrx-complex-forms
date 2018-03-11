import { TestBed, inject } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs/Observable';

import { LineItemEffects } from './line-item.effects';

describe('LineItemService', () => {
  let actions$: Observable<any>;
  let effects: LineItemEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LineItemEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(LineItemEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
