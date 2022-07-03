import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavouriteListComponent } from './favourite-list/favourite-list.component';
import { ListComponent } from './list/list.component';
import { ProductComponent } from './product.component';

const routes: Routes = [
  {
    path: '', component: ProductComponent,
    children: [
      { path: '', redirectTo: 'all', pathMatch: 'full' },
      { path: 'all', component: ListComponent },
      { path: 'favourite', component: FavouriteListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
