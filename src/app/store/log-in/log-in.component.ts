import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth.service';
@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent {
  form!: FormGroup;
  user$!: Observable<User | null>;

  constructor(
    public dialogRef: MatDialogRef<LogInComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private auth: AuthService,
    private router : Router
  ) {
    this.user$ = this.auth.user$;
  }

  onSignInWithGoogle(): void {
    this.auth.signInWithGoogle().catch(error => console.error(error));
    this.router.navigate(['/']);
  }
  
  
  ngOnInit() {
    this.buildForm();
    this.user$.subscribe(user => {
      if (user) {
        console.log('User is logged in');
      } else {
        console.log('User is not logged in');
      }
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  buildForm(value: any = null) {
    this.form = this.fb.group({
      email: [value ? value.email : null, [Validators.required, Validators.email]],
      password: [value ? value.password : null, [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    console.log(this.form.value);
    this.form.reset();
  }

  async onSignOut(): Promise<void> {
    try {
      await this.auth.signOut();
      console.log('User signed out');
    } catch (error) {
      console.error('Error signing out', error);
    }
  }
  
}
