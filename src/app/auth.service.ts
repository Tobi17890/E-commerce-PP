import { EventEmitter, Injectable } from '@angular/core';
import { GoogleAuthProvider, getAuth, signInWithPopup, User, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$!: Observable<User | null>;
  public loggingOut = new EventEmitter<void>();
  public isLoggingOut = new BehaviorSubject<boolean>(false);
  public isLoading = new BehaviorSubject<boolean>(false);
  
  constructor() {
    const auth = getAuth();
    this.user$ = new Observable((subscriber) => {
      onAuthStateChanged(auth, (user) => {
        subscriber.next(user);
      });
    });
  }

  async signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const credential = await signInWithPopup(auth, provider);
    if (credential.user) {
      this.updateUserData(credential.user);
    }
  }

  private async updateUserData(user: User): Promise<void> {
    const db = getFirestore();
    const userRef = doc(db, 'users', user.uid);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    await setDoc(userRef, data, { merge: true });
  }
  async signOut(): Promise<void> {
    const auth = getAuth();
    await signOut(auth);
  }
  
}
