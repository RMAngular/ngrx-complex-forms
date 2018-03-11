import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatCardModule, MatTableModule } from '@angular/material';

import { OrdersComponent } from './containers/orders/orders.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrdersTableComponent } from './components/orders-table/orders-table.component';
import { OrderComponent } from './containers/order/order.component';

@NgModule({
  imports: [CommonModule, FlexLayoutModule, MatCardModule, MatTableModule],
  declarations: [
    OrderComponent,
    OrdersComponent,
    OrderDetailComponent,
    OrderFormComponent,
    OrdersTableComponent
  ]
})
export class OrdersModule {}
