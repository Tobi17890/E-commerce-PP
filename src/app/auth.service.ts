import { EventEmitter, Injectable } from '@angular/core';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  User,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface AdminData {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: string;
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  user$!: Observable<AdminData | null>;
  admin$!: Observable<AdminData | null>;

  public loggingOut = new EventEmitter<void>();
  public isLoggingOut = new BehaviorSubject<boolean>(false);
  public isLoading = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    const auth = getAuth();
    this.user$ = new Observable((subscriber) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const db = getFirestore();
          const adminEmails = ['admindash@gmail.com', 'admin@gmail.com', 'admin3@example.com'];
          const collection = user.email && adminEmails.includes(user.email) ? 'admin' : 'users';
          const userRef = doc(db, collection, user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            const data = userDoc.data() as AdminData;
            subscriber.next(data);
          }
        } else {
          subscriber.next(null);
        }
      });
    });
  }
  
  

  // async signInWithGoogle(): Promise<void> {
  //   const provider = new GoogleAuthProvider();
  //   const auth = getAuth();
  //   const credential = await signInWithPopup(auth, provider);
  //   console.log(credential.user, 'user');

  //   if (credential.user) {
  //   this.isLoading.next(true);
  //     this.updateUserData(credential.user);
  //   }
  //   this.isLoading.next(false);
  // }

  async signInWithGoogle(): Promise<void> {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    const credential = await signInWithPopup(auth, provider);

    if (credential.user) {
      this.isLoading.next(true);
      await this.updateUserData(credential.user);
    }
    this.isLoading.next(false);
  }

  private async updateUserData(user: any): Promise<void> {
    const db = getFirestore();
    const userRef = doc(db, 'users', user.uid);

    const adminEmails = [
      'admindash@gmail.com',
      'admin@gmail.com',
      'admin3@example.com',
    ];
    const role = adminEmails.includes(user.email) ? 'admin' : 'user';

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      role: role,
    };

    await setDoc(userRef, data, { merge: true });
  }
  
  // async signInWithGoogle(): Promise<void> {
  //   const provider = new GoogleAuthProvider();
  //   const auth = getAuth();
  //   const credential = await signInWithPopup(auth, provider);
  
  //   if (credential.user) {
  //     const db = getFirestore();
  //     const userRef = doc(db, 'users', credential.user.uid);
  //     const userDoc = await getDoc(userRef);
  //     if (userDoc.exists()) {
  //       const data = userDoc.data() as AdminData;
  //       this.user$ = of(data);
  //     }
  //   }
    
  // }

  // async signInWithEmailAndPasswordAdmin(email: string, password: string) {
  //   const auth = getAuth();
  //   const credential = await signInWithEmailAndPassword(auth, email, password);

  //   if (credential.user) {
  //     this.isLoading.next(true);
  //     await this.updateUserData(credential.user);
  //   }
  //   this.isLoading.next(false);
  //   return credential;
  // }

  // private async updateUserData(user: any): Promise<void> {
  //   const db = getFirestore();
  //   const userRef = doc(db, 'users', user.uid);

  //   const adminEmails = ['admindash@gmail.com', 'admin@gmail.com'];
  //   const role = adminEmails.includes(user?.email) ? 'admin' : 'user';

  //   const data = {
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: user.displayName,
  //     photoURL: user.photoURL,
  //     role: role
  //   };

  //   await setDoc(userRef, data, { merge: true });
  // }



  // async signOut(): Promise<void> {
  //   this.isLoggingOut.next(true);
  //   const auth = getAuth();
  //   await signOut(auth);
  //   this.isLoggingOut.next(false);
  //   this.loggingOut.emit();
  // }

  async signOut(): Promise<void> {
    this.isLoggingOut.next(true);
    const auth = getAuth();
    await signOut(auth);
    localStorage.removeItem('role'); // Clear the role from local storage
    this.isLoggingOut.next(false);
    this.loggingOut.emit();
  }
  

  // async getCurrentUser(): Promise<any> {
  //   const auth = getAuth();
  //   const user = auth.currentUser;
  //   if (user) {
  //     const db = getFirestore();
  //     const userRef = doc(db, 'users', user.uid);
  //     const userDoc = await getDoc(userRef);
  //     if (userDoc.exists()) {
  //       return userDoc.data();
  //     }
  //   }
  //   return null;
  // }

async getCurrentUser(): Promise<any> {
const auth = getAuth();
const user = auth.currentUser;
if (user) {
const db = getFirestore();
const userRef = doc(db, 'admin', user.uid);
const userDoc = await getDoc(userRef);
if (userDoc.exists()) {
console.log(userDoc.data(), 'userDoc.data()');

return userDoc.data();
}
}
return null;
}


async signInWithEmailAndPasswordAdmin(email: string, password: string) {
  const auth = getAuth();
  const credential = await signInWithEmailAndPassword(auth, email, password);
  
  if (credential.user) {
    const db = getFirestore();
    const userRef = doc(db, 'users', credential.user.uid);
    
    const adminEmails = ['admindash@gmail.com', 'admin@gmail.com', 'admin3@example.com'];
    const role = adminEmails.includes(email) ? 'admin' : 'user';

    // Mapping of emails to names with index signature
    const emailToName: { [key: string]: string } = {
      'admindash@gmail.com': 'Admin Dash',
      'admin@gmail.com': 'Admin',
      'admin3@example.com': 'Admin3'
    };

    const data = {
      uid: credential.user.uid,
      email: credential.user.email,
      displayName: emailToName[email] || credential.user.displayName, // Use the mapped name if it exists, otherwise use the original displayName
      photoURL: credential.user.photoURL,
      role: role
    };
    localStorage.setItem('role', data.role);
    await setDoc(userRef, data, { merge: true });

    // Update the admin$ Observable
    this.admin$ = of(data);
  }

  return credential;
}

  // async signInWithEmailAndPasswordAdmin(email: string, password: string) {
  //   const auth = getAuth();
  //   const credential = await signInWithEmailAndPassword(auth, email, password);
    
  //   if (credential.user) {
  //     const db = getFirestore();
  //     const userRef = doc(db, 'admin', credential.user.uid);
  //     const userDoc = await getDoc(userRef);
  //     if (userDoc.exists()) {
  //       const data = userDoc.data() as AdminData;
  //       this.admin$ = of(data);
  //     }
  //   }
  //   return credential;
  // }
  

  getCountries() {
    const data = this.http.get('https://restcountries.com/v3.1/all');
    return data;
  }

  isAuthenticated(): boolean {
    const auth = getAuth();
    return auth.currentUser !== null;
  }

  async getRole(): Promise<string | null> {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const db = getFirestore();
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        return userDoc.data()['role'];
      }
    }
    return null;
  }

  async isAdmin(): Promise<boolean> {
    const role = await this.getRole();
    return role === 'admin';
  }
}
