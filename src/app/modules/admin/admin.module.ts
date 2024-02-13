import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { HeaderComponent } from './layouts/header/header.component';
import { SidebarComponent } from './layouts/sidebar/sidebar.component';
import { MainlayoutComponent } from './layouts/mainlayout/mainlayout.component';
import { MainRoutePageComponent } from './main-route-page/main-route-page.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductListingComponent } from './product-listing/product-listing.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SidebarComponent,
    MainlayoutComponent,
    MainRoutePageComponent,
    AddProductComponent,
    ProductListingComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule { }
