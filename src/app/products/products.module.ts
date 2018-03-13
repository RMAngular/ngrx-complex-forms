import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {
  MatCardModule,
  MatTableModule,
  MatButtonModule,
  MatInputModule,
  MatIconModule
} from '@angular/material';

import { ProductsComponent } from './containers/products/products.component';
import { ProductComponent } from './containers/product/product.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductEditComponent } from './containers/product-edit/product-edit.component';
import { ProductAddComponent } from './containers/product-add/product-add.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    ProductsComponent,
    ProductComponent,
    ProductsTableComponent,
    ProductFormComponent,
    ProductDetailComponent,
    ProductEditComponent,
    ProductAddComponent
  ]
})
export class ProductsModule {}
