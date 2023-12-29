import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/store/shared/services/data.service';
import { query, where, doc, serverTimestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  constructor(private db: DataService) {}
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter your email';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit() {
    const batch = this.db.batch();

    const docData : any = {
      key: this.db.createId(),
      email: this.email.value,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }

    const docRef = doc(this.db.catogryRef(), docData?.key);
    console.log(docRef, 'docRef');
    batch.set(docRef, docData);
    batch.commit().then(() => {
      this.email.reset();
    });
    
    
  }
}
