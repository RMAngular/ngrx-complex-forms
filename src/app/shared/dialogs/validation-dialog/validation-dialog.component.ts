import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Validation } from '@core/interfaces/validation';
import { Store } from '@ngrx/store';
import { AppState } from '@state/app.interfaces';
import { CloseOrderValidationDialog } from '@state/order/order.actions';

interface Data {
  validations: Validation[];
}

@Component({
  templateUrl: './validation-dialog.component.html',
  styleUrls: ['./validation-dialog.component.scss']
})
export class ValidationDialogComponent implements OnInit {
  validations: Validation[];

  constructor(@Inject(MAT_DIALOG_DATA) private data: Data, private store: Store<AppState>) {}

  ngOnInit() {
    this.validations = this.data.validations;
  }

  close() {
    this.store.dispatch(new CloseOrderValidationDialog());
  }
}
