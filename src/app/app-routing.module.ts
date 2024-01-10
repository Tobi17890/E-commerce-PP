import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainlayoutComponent } from './Layouts/mainlayout/mainlayout.component';
import {
  AuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { HomePageComponent } from './Layouts/home-page/home-page.component';
import { MenLayoutComponent } from './mens/men-layout/men-layout.component';
import { NewsComponent } from './mens/men-layout/news/news.component';
import { SalesComponent } from './mens/men-layout/sales/sales.component';
import { ClothingComponent } from './mens/men-layout/clothing/clothing.component';
import { DenimComponent } from './mens/men-layout/denim/denim.component';
import { AcessoriesComponent } from './mens/acessories/acessories.component';
import { ReviewBeforeAddingComponent } from './mens/review-before-adding/review-before-adding.component';
import { CartComponent } from './mens/cart/cart.component';

const routes: Routes = [
  {
    path: '', // localhost:4200
    component: HomePageComponent,
    // canActivate: [AuthGuard],
    // data : { authGuardPipe: () => redirectUnauthorizedTo(['/']) },
  },
  {
    path: 'all',
    component: MenLayoutComponent,
    children: [
      {
        path: 'men/new',
        component: NewsComponent,
      },
      {
        path: 'men/denim',
        component: DenimComponent,
      },
      {
        path: 'men/clothing',
        component: ClothingComponent,
      },
      {
        path: 'men/accessories',
        component: AcessoriesComponent,
      },
      {
        path: 'men/sales',
        component: SalesComponent,
      },
    ],
  },
  {
    path: 'reviews',
    component: ReviewBeforeAddingComponent,
  },
  {
    path: 'cart',
    component: CartComponent
  },
  {
    path: 'admin',
    component: MainlayoutComponent,
    // canActivate: [AuthGuard],
    // data: { authGuardPipe: () => redirectUnauthorizedTo(['/']) },
    loadChildren: () =>
      import(`./modules/admin/admin.module`).then((m) => m.AdminModule),
  },
  {
    path: 'user',
    component: MainlayoutComponent,
    // canActivate: [AuthGuard],
    // data: { authGuardPipe: () => redirectUnauthorizedTo(['/']) },
    loadChildren: () =>
      import(`./modules/user/user.module`).then((m) => m.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
