import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsModule } from './products.module';
import { ProductsComponent } from './containers/products/products.component';
import { ProductComponent } from './containers/product/product.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: ':id',
    component: ProductComponent
  }
];

@NgModule({
  imports: [ProductsModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
