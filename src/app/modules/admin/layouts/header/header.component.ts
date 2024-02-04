import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild('dropdown') dropdown!: ElementRef;
  @ViewChild('account') account!: ElementRef;
  listenerFn!: () => void;
  constructor(
    private renderer: Renderer2,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.auth.loggingOut.subscribe(() => {
      this.router.navigate(['/']);
    });
    this.listenerFn = this.renderer.listen(
      'document',
      'click',
      (event: MouseEvent) => {
        if (
          this.dropdown &&
          !this.dropdown.nativeElement.contains(event.target) &&
          !this.account.nativeElement.contains(event.target)
        ) {
          this.dropdown.nativeElement.style.display = 'none';
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.listenerFn) {
      this.listenerFn();
    }
  }

  onClickAccount() {
    if (this.dropdown.nativeElement.style.display === 'block') {
      this.dropdown.nativeElement.style.display = 'none';
    } else {
      this.dropdown.nativeElement.style.display = 'block';
    }
  }
  async signOut(): Promise<void> {
    try {
      await this.auth.signOut();
      localStorage.removeItem('admin'); // Remove the admin from local storage
    } catch (error) {
      console.error('Error signing out', error);
    }
  }
}
