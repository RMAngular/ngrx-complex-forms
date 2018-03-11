import { CommonModule } from '@angular/common';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';

import { ProductService } from '@core/services/product.service';
import { LineItemService } from '@core/services/line-item.service';
import { CustomerService } from '@core/services/customer.service';
import { OrderService } from '@core/services/order.service';

@NgModule({
  imports: [CommonModule],
  providers: [CustomerService, LineItemService, OrderService, ProductService]
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule
    };
  }

  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
