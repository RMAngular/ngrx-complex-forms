import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './containers/orders/orders.component';
import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderFormComponent } from './components/order-form/order-form.component';

@NgModule({
  imports: [CommonModule],
  declarations: [
    OrdersComponent,
    OrderDetailComponent,
    OrderListComponent,
    OrderFormComponent
  ]
})
export class OrdersModule {}
