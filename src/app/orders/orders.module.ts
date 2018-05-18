import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatOptionModule,
  MatSelectModule,
  MatTableModule
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { CustomerComponent } from './components/customer/customer.component';
import { LineitemsTableComponent } from './components/lineitems-table/lineitems-table.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { OrdersTableComponent } from './components/orders-table/orders-table.component';
import { OrderComponent } from './containers/order/order.component';
import { OrdersComponent } from './containers/orders/orders.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatFormFieldModule,
    MatMenuModule,
    MatOptionModule,
    MatSelectModule,
    MatTableModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    CustomerComponent,
    LineitemsTableComponent,
    OrderComponent,
    OrderDetailComponent,
    OrderFormComponent,
    OrdersComponent,
    OrdersTableComponent,
    OrderSummaryComponent
  ]
})
export class OrdersModule {}
