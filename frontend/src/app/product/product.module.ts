import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { FavouriteListComponent } from './favourite-list/favourite-list.component';
import { ListComponent } from './list/list.component';
import { ProductComponent } from './product.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    FavouriteListComponent,
    ListComponent,
    ProductComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    NgxPaginationModule
  ]
})
export class ProductModule { }
