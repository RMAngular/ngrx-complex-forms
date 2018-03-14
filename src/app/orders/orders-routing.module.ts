import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OrdersModule } from './orders.module';
import { OrderComponent } from './containers/order/order.component';
import { OrdersComponent } from './containers/orders/orders.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent
  },
  {
    path: 'add',
    component: OrderComponent
  },
  {
    path: ':id',
    component: OrderComponent
  }
];

@NgModule({
  imports: [OrdersModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {}
