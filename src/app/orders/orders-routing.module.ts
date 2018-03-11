import { OrdersModule } from './orders.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersComponent } from './containers/orders/orders.component';

const routes: Routes = [
  {
    path: '',
    component: OrdersComponent
  }
];

@NgModule({
  imports: [OrdersModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {}
