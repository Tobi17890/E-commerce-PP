import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainlayoutComponent } from './modules/admin/layouts/mainlayout/mainlayout.component';
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
import { LogInComponent } from './store/log-in/log-in.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminServiceService } from './adminguard/admin-service.service';
import { AdminRedirectGuard } from './adminguard/admin-redirect-guard.service';
import { RedirectAuthenticatedGuard } from './adminguard/unauthenticatedGuard.service';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';


const routes: Routes = [
  {
    path: '', // localhost:4200
    component: HomePageComponent,
    canActivate: [RedirectAuthenticatedGuard],
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
    path: 'reviews/:id',
    component: ReviewBeforeAddingComponent,
  },
  {
    path: 'cart/:id',
    component: CartComponent
  },
  {
    path: 'login',
    component: AdminLoginComponent,
    // canActivate: [AdminServiceService],
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminServiceService],
    data: { expectedRole: 'admin' },
    loadChildren: () =>
      import(`./modules/admin/admin.module`).then((m) => m.AdminModule),
  },
  {
    path: 'user',
    component: MainlayoutComponent,
    // canActivate: [AdminServiceService],
    // data: { expectedRole: 'user' },
    loadChildren: () =>
      import(`./modules/user/user.module`).then((m) => m.UserModule),
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [RedirectAuthenticatedGuard, AdminServiceService],
  exports: [RouterModule],
})
export class AppRoutingModule {}
