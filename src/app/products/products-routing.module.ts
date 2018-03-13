import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsModule } from './products.module';
import { ProductsComponent } from './containers/products/products.component';
import { ProductComponent } from './containers/product/product.component';
import { ProductAddComponent } from './containers/product-add/product-add.component';
import { ProductEditComponent } from './containers/product-edit/product-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: 'add',
    component: ProductAddComponent
  },
  {
    path: ':id/edit',
    component: ProductEditComponent
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
export class ProductsRoutingModule {}
