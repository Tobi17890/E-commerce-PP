import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from './auth.service';
import { LoginDialogComponent } from './store/login-dialog/login-dialog.component';
import { AnimationOptions } from 'ngx-lottie';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'OutfittersHub';
  loading = true;
  private subscription!: Subscription;

  options: AnimationOptions = {
    path: 'assets/animation/loading.json',
  };
  constructor(
    private dialog: MatDialog,
    private auth: AuthService,
    private router: Router
  ) {
    this.subscription = this.auth.user$.subscribe((user) => {
      if (user) {
        setTimeout(() => {
          this.loading = false;
        }, 500);
      } else {
        setTimeout(() => {
          this.loading = false;
        }, 500);
      }
    });
    this.auth.loggingOut.subscribe(() => {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
      }, 2000);
    });
    this.auth.isLoading.subscribe((isLoading) => {
      if (isLoading) {
        this.loading = true;
      }
    });
    // this.auth.isLoggingOut.subscribe((isLoggingOut) => {
    //   if (isLoggingOut) {
    //     this.loading = true;
    //   } else {
    //     this.loading = false;
    //   }
    // });
  }

  // ngOnInit() {
  //   setTimeout(() => {
  //     this.auth.user$.subscribe((user) => {
  //       if (!user) {
  //         const dialogRef = this.dialog.open(LoginDialogComponent);
  //         dialogRef.componentInstance.loginSuccess.subscribe(() => {
  //           this.loading = true;
  //           setTimeout(() => {
  //             this.loading = false;
  //           }, 2000);
  //         });
  //       }
  //     });
  //   }, 15000);
  // }
  ngOnInit() {
    setTimeout(() => {
      this.auth.user$.subscribe((user) => {
        if (
          this.router.url !== '/admin' &&
          !user &&
          !this.auth.isLoggingOut.getValue() &&
          this.router.url !== '/login'
        ) {
          const dialogRef = this.dialog.open(LoginDialogComponent);
          dialogRef.componentInstance.loginSuccess.subscribe(() => {
            this.loading = true;
            setTimeout(() => {
              this.loading = false;
            }, 2000);
          });
        }
      });
    }, 15000);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
