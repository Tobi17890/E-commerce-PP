import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainlayoutComponent } from './Layouts/mainlayout/mainlayout.component';
import {
  AuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { HomePageComponent } from './Layouts/home-page/home-page.component';

const routes: Routes = [
  {
    path: '', // localhost:4200
    component: HomePageComponent,
    // canActivate: [AuthGuard],
    data : { authGuardPipe: () => redirectUnauthorizedTo(['/']) },
    children: [
      {
        path: '', component: HomePageComponent,
      }
    ]
  },
  {
    path: 'admin',
    component: MainlayoutComponent,
    // canActivate: [AuthGuard],
    // data: { authGuardPipe: () => redirectUnauthorizedTo(['/']) },
    loadChildren: () =>
      import(`./modules/admin/admin.module`).then(
        (m) => m.AdminModule
      ),
  },
  {
    path: 'user',
    component: MainlayoutComponent,
    // canActivate: [AuthGuard],
    // data: { authGuardPipe: () => redirectUnauthorizedTo(['/']) },
    loadChildren: () =>
      import(`./modules/user/user.module`).then(
        (m) => m.UserModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
