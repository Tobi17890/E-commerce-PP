import { EventEmitter, Injectable } from '@angular/core';
import { GoogleAuthProvider, getAuth, signInWithPopup, User, signOut, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$!: Observable<User | null>;
  public loggingOut = new EventEmitter<void>();
  public isLoggingOut = new BehaviorSubject<boolean>(false);
  public isLoading = new BehaviorSubject<boolean>(false);
  
  constructor(  private http: HttpClient) {
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
    this.isLoading.next(true);
      this.updateUserData(credential.user);
    }
    this.isLoading.next(false);
  }
  

  private async updateUserData(user: any): Promise<void> {
    const db = getFirestore();
    const userRef = doc(db, 'users', user.uid);
  
    const adminEmails = ['admindash@gmail.com', 'admin@gmail.com'];
    const role = adminEmails.includes(user?.email) ? 'admin' : 'user'; // Determine user role
  
    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: role // Assign the determined role
    };
  
    await setDoc(userRef, data, { merge: true });
  }
  
  
  async signOut(): Promise<void> {
    const auth = getAuth();
    await signOut(auth);
  }

  getCurrentUser(): User | null {
    const auth = getAuth();
    return auth.currentUser;
  }

  async signInWithEmailAndPasswordAdmin(email: string, password: string) {
    // this.isLoading.next(true);
    const auth = getAuth();
    const credential = await signInWithEmailAndPassword(auth, email, password).then( cred => {
      localStorage.setItem('admin', JSON.stringify(cred.user));
      return cred;
    })
  
    if (credential.user) {
      const db = getFirestore();
      const userRef = doc(db, 'users', credential.user.uid);
      const adminEmails = ['admindash@gmail.com', 'admin@gmail.com', 'admin3@example.com'];
  
      const data = {
        uid: credential.user.uid,
        email: credential.user.email,
        displayName: credential.user.displayName,
        photoURL: credential.user.photoURL,
        role: adminEmails.includes(email) ? 'admin' : 'user' // Add role property
      };
      await setDoc(userRef, data, { merge: true });
    }
    // this.isLoading.next(false);
    return credential;
  }

  
  getCountries() {
    const data = this.http.get('https://restcountries.com/v3.1/all');
    return data;
  }

  isAuthenticated(): boolean {
    const auth = getAuth();
    return auth.currentUser !== null;
  }

  // Add this method to get the role of the current user
  async getRole(): Promise<string | null> {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const db = getFirestore();
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      console.log(userDoc.data(), 'hi');
      
      if (userDoc.exists()) {
        const role = userDoc.data()['role'];
        console.log();
        
        return userDoc.data()['role'];
      }
    }
    return null;
  }
  
}
