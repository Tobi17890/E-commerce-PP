import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
import { UserStoreService } from 'src/app/shared/user-store.service';
import { LogInComponent } from 'src/app/store/log-in/log-in.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  @ViewChild('dropdown_container') dropdown_container!: ElementRef;
  @ViewChild('logo') logo!: ElementRef;
  @ViewChild('icons') icons!: ElementRef;
  @ViewChild('bag') bag!: ElementRef;
  @ViewChild('iconItem') iconItem!: ElementRef;
  
  closeClicked = false;
  mouseInBag = false;
  loading = true;
  user$!: Observable<User | null>;
  user: any;

  constructor( 
    private el: ElementRef, 
    private renderer: Renderer2, 
    public dialog: MatDialog,
    private auth: AuthService,
    private router: Router,
    private userStore: UserStoreService) {
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
  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.checkScroll();
  }
  ngAfterViewInit() {
    this.checkScroll();
    if (this.dropdown_container.nativeElement.style.top === '0') {
      console.log('top');
    }
  }
  checkScroll() {
    const rect = this.dropdown_container.nativeElement.getBoundingClientRect();
    if (rect.top <= 0) {
      this.dropdown_container.nativeElement.classList.add('centered');
      this.logo.nativeElement.style.display = 'flex';
      this.icons.nativeElement.style.display = 'flex';
    } else {
      this.dropdown_container.nativeElement.classList.remove('centered');
      this.logo.nativeElement.style.display = 'none';
      this.icons.nativeElement.style.display = 'none';
    }
  }

  
  openDialog(): void {
    const dialogRef = this.dialog.open(LogInComponent, {
      width: '400px',
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
