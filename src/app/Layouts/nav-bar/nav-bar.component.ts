import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { UserStoreService } from 'src/app/shared/user-store.service';
import { LogInComponent } from 'src/app/store/log-in/log-in.component';
import { LoginDialogComponent } from 'src/app/store/login-dialog/login-dialog.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  user$!: Observable<User | null>;
  user: any;
  loading = true;
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
      this.user$.subscribe(user => {
        if (user) {
          const uid = user.uid;
          this.userStore.getUser(uid).then((res) => {
            this.user = res;
          });
        }
      });
    }
    

    openDialog(): void {
      const dialogRef = this.dialog.open(LoginDialogComponent, {
        width: '600px',
        height: '426px',
        data: {name: 'this.name', animal: 'this.animal'}
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed', result);
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
      console.log('logout');
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
