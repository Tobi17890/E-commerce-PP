import { Component, EventEmitter, Inject, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { Observable, Subscription } from 'rxjs';
import { AdminData, AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent {
  form!: FormGroup;
  user$!: Observable<AdminData | null>;
  isLoginFormVisible = false;
  loading = true;
  private subscription!: Subscription;

  @Output() loginSuccess = new EventEmitter<void>();
  constructor(
    public dialogRef: MatDialogRef<LoginDialogComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private auth: AuthService,
    private router : Router
  ) {
    // this.user$ = this.auth.user$;
  }

  // onSignInWithGoogle(): void {
  //   this.auth.signInWithGoogle().catch(error => console.error(error));
  //   this.router.navigate(['/']);
  // }

  onSignInWithGoogle(): void {
    this.auth.signInWithGoogle().then(() => {
      this.loginSuccess.emit();
    }).catch(error => console.error(error));
    this.router.navigate(['/']);
  }

  
  
  ngOnInit() {
    this.buildForm();
    this.subscription = this.auth.user$.subscribe(user => {
      if (user) {
        this.dialogRef.close();
      } else if (!this.auth.isLoggingOut.getValue()) {
        // Open the dialog only if the user is not logging out
        // this.dialogRef.open();
      }
    });
  }
  

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }


  buildForm(value: any = null) {
    this.form = this.fb.group({
      email: [value ? value.email : null, [Validators.required, Validators.email]],
      password: [value ? value.password : null, [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    this.form.reset();
  }

  async onSignOut(): Promise<void> {
    try {
      await this.auth.signOut();
    } catch (error) {
      console.error('Error signing out', error);
    }
  }
  toggleLoginForm(): void {
    this.isLoginFormVisible = !this.isLoginFormVisible;
  }
  unToggleLoginForm(): void {
    this.isLoginFormVisible = false;
  }
}
