import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { AnimationOptions } from 'ngx-lottie';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent {
  form!: FormGroup;
  user$!: Observable<User | null>;
  isLoginFormVisible = false;

  background: AnimationOptions = {
    path: 'assets/animation/background.json',
  };


  constructor(
    // @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.user$ = this.auth.user$;    
  }
  
  onSignInWithGoogle(): void {
    this.auth
      .signInWithGoogle()
      .then(() => {})
      .catch((error) => console.error(error));
  }

  ngOnInit() {
    const admin = JSON.parse(localStorage?.getItem('admin') || '{}');  
    if (admin) {
      this.router.navigate(['/admin']);
    }
    this.buildForm();
    this.user$.subscribe((user) => {
      if (user) {
      } else {
      }
    });

  }

  buildForm(value: any = null) {
    this.form = this.fb.group({
      email: [
        value ? value.email : null,
        [Validators.required, Validators.email],
      ],
      password: [
        value ? value.password : null,
        [Validators.required, Validators.minLength(6)],
      ],
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const { email, password } = this.form.value;

      this.auth
        .signInWithEmailAndPasswordAdmin(email, password)
        .then((result) => {
          if (result.user.email === 'admindash@gmail.com' || 'admin@gmail.com') {
            this.router.navigate(['/admin']);
          } else {
          }
        })
        .catch((error) => {});
    }
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
