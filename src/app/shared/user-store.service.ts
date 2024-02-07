import { Injectable } from '@angular/core';
import { query, getDocs, getDoc, doc, collection, where } from 'firebase/firestore';
import { DataService } from '../store/shared/services/data.service';
import { pushToArray } from '../store/shared/services/mapping.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStoreService {
  constructor(private ds: DataService, private http: HttpClient) {}

  // async getUser() {
  //   const queryRef = query(this.ds.userRef());
  //   return pushToArray(await getDocs(queryRef));
  // }

  async getUser(uid: string) {
    const docRef = doc(this.ds.userRef(), uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
    }
    return null;
  }

  async getAdmin(uid: string) {
    const docRef = doc(this.ds.adminRef(), uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
    }
    return null;
  }


  async getUserByEmail(email: string) {
    const q = query(this.ds.userRef(), where("email", "==", email));
    const querySnapshot = await getDocs(q);
  
    if (!querySnapshot.empty) {
      // Assuming each email is unique, so only one doc should match the query.
      return querySnapshot.docs[0].data();
    } else {
      return null;
    }
  }
  

  getCountries() {
    return this.http.get('https://restcountries.com/v3.1/all').pipe(
      map((data: any) => {
        return data
          .sort((a: any, b: any) => b.population - a.population)
          .slice(0, 10);
      })
    );
  }
}
