import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';


@Injectable()
export class CustomerEffects {

  constructor(private actions$: Actions) {}
}
