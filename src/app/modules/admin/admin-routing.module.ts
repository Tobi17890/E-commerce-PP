import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { MainlayoutComponent } from './layouts/mainlayout/mainlayout.component';
import { ProductListingComponent } from './product-listing/product-listing.component';
import { AddProductComponent } from './add-product/add-product.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CategoryListingComponent } from './category-listing/category-listing.component';

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
      },
      {
        path: 'products/category',
        component: CategoryListingComponent,
      },
      {
        path: 'products/add-category',
        component: AddCategoryComponent,
      }
    ]
  },

];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
