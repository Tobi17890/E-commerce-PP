import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AdminData, AuthService } from 'src/app/auth.service';
import { UserStoreService } from 'src/app/shared/user-store.service';
import { LogInComponent } from 'src/app/store/log-in/log-in.component';
import { LoginDialogComponent } from 'src/app/store/login-dialog/login-dialog.component';
import { SearchDialogComponent } from 'src/app/store/search-dialog/search-dialog.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  user$!: Observable<AdminData | null>;
  user: any;
  loading = true;
  heartIcon = false;
  @ViewChild('bag') bag!: ElementRef;
  @ViewChild('iconItem') iconItem!: ElementRef;
  closeClicked = false;
  mouseInBag = false;
  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    public dialog: MatDialog,
    private auth: AuthService,
    private router: Router,
    private userStore: UserStoreService
  ) {
    this.user$ = this.auth.user$;
    this.user$.subscribe((user) => {
      if (user) {        
        const uid = user.uid;
        this.userStore.getUser(uid).then((res) => {
          this.user = res;
          if (this.user.role !== 'admin') { 
          }
        });
      }
    });
    // this.auth.user$.subscribe((user) => {
    //   console.log(user, 'user');
      
    //   if (user) {        
    //     const uid = user.uid;
    //     this.userStore.getUser(uid).then((res) => {
    //       console.log(res, 'res');
          
    //       this.user = res;
    //       // You can access user properties here and display them in the nav-bar
    //     });
    //   }
    // });

  }

  ngOnInit() {
    this.userStore.getCountries().subscribe((res) => {
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '600px',
      height: '426px',
      data: { name: 'this.name', animal: 'this.animal' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
    });
  }

  openSearchDialog() {
    this.dialog.open(SearchDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: { name: 'this.name', animal: 'this.animal' },
    });
  }

  expandBag() {
    this.renderer.setStyle(this.bag.nativeElement, 'opacity', '1');
    this.bag.nativeElement.classList.add('expanded');
    this.iconItem.nativeElement.classList.add('expanded');
    this.closeClicked = false;
    this.onBagEnter();
  }

  closeBag() {
    this.renderer.setStyle(this.bag.nativeElement, 'opacity', '0');
    this.bag.nativeElement.classList.remove('expanded');
    this.iconItem.nativeElement.classList.remove('expanded');
    this.closeClicked = true;
  }
  onBagEnter() {
    this.mouseInBag = true;
  }

  onBagLeave() {
    this.mouseInBag = false;
    if (this.closeClicked) {
      this.closeBag();
    }
  }

  // onLogout() {
  // this.loading = true;
  // this.auth.isLoggingOut.next(true);
  // this.auth.signOut().then(() => {
  //   setTimeout(() => {
  //     this.loading = false;
  //     this.auth.isLoggingOut.next(false);
  //   }, 2000);
  // });
  // }

  onLogout() {
    this.auth.isLoading.next(true);
    this.auth.isLoggingOut.next(true);
    this.auth.signOut().then(() => {
      setTimeout(() => {
        this.auth.isLoading.next(false);
        this.auth.isLoggingOut.next(false);
      }, 2000);
    });
  }
}
