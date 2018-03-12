import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './containers/products/products.component';
import { ProductComponent } from './containers/product/product.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { ProductsFormComponent } from './components/products-form/products-form.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ProductsComponent, ProductComponent, ProductsTableComponent, ProductsFormComponent, ProductDetailComponent]
})
export class ProductsModule { }
