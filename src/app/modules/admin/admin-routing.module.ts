import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { MainRoutePageComponent } from './main-route-page/main-route-page.component';
import { MainlayoutComponent } from './layouts/mainlayout/mainlayout.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { AddProductComponent } from './add-product/add-product.component';

const routes: Routes = [
  {
    path: '',
    component: MainlayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'admin/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'products/listing',
        component: ProductListingComponent
      },
      {
        path: 'products/adding',
        component: AddProductComponent,
      }
    ]
  },

];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
