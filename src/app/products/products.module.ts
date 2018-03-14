import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatCardModule,
  MatMenuModule,
  MatIconModule,
  MatInputModule,
  MatTableModule
} from '@angular/material';

import { ProductComponent } from './containers/product/product.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductsComponent } from './containers/products/products.component';
import { ProductsTableComponent } from './components/products-table/products-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatTableModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: [
    ProductComponent,
    ProductFormComponent,
    ProductsComponent,
    ProductsTableComponent
  ]
})
export class ProductsModule {}
