import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from '@angular/fire/auth-guard';
import { environment } from './environments/environment';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideFirebaseApp, initializeApp, getApp } from '@angular/fire/app';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { NavBarComponent } from './Layouts/nav-bar/nav-bar.component';
import { SharedModule } from './store/shared/shared.module';
import { HomePageComponent } from './Layouts/home-page/home-page.component';
import { CategoriesComponent } from './Layouts/categories/categories.component';
import { FooterComponent } from './Layouts/footer/footer.component';
import { MaterialsModule } from './store/materials/materials.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenLayoutComponent } from './mens/men-layout/men-layout.component';
import { NewsComponent } from './mens/men-layout/news/news.component';
import { ClothingComponent } from './mens/men-layout/clothing/clothing.component';
import { SalesComponent } from './mens/men-layout/sales/sales.component';
import { DenimComponent } from './mens/men-layout/denim/denim.component';
import { AcessoriesComponent } from './mens/acessories/acessories.component';
import { ButtonComponent } from './Buttons/button/button.component';
import { DropdownBtnComponent } from './Buttons/dropdown-btn/dropdown-btn.component';
import { ReviewBeforeAddingComponent } from './mens/review-before-adding/review-before-adding.component';
import { LogInComponent } from './store/log-in/log-in.component';
import { CartComponent } from './mens/cart/cart.component';
import { LoginDialogComponent } from './store/login-dialog/login-dialog.component';
import { HttpClientModule } from '@angular/common/http';
import { SearchDialogComponent } from './store/search-dialog/search-dialog.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminLayoutComponent } from './admin/admin-layout/admin-layout.component';
// import { UserStore } from './store/log-in/store';
import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
import { PaymentsComponent } from './mens/payments/payments.component';

// export function playerFactory() {
//   return player;
// }

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NavBarComponent,
    CategoriesComponent,
    FooterComponent,
    MenLayoutComponent,
    NewsComponent,
    ClothingComponent,
    SalesComponent,
    DenimComponent,
    AcessoriesComponent,
    ButtonComponent,
    DropdownBtnComponent,
    ReviewBeforeAddingComponent,
    LogInComponent,
    CartComponent,
    LoginDialogComponent,
    SearchDialogComponent,
    AdminLoginComponent,
    AdminLayoutComponent,
    PaymentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    AngularFireModule.initializeApp(environment.firebase),
    // LottieModule.forRoot({ player: () => import('lottie-web') }),
    SharedModule,
    MaterialsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [AuthGuard,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
