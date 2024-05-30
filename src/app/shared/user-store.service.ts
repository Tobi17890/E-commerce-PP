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
  constructor(private ds: DataService) {}

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

  async getProduct() {
    const q = query(this.ds.productRef(), where("category", "array-contains", "New"));
    const querySnapshot = await getDocs(q);
    return pushToArray(querySnapshot);
  }

  async getProductClothing() {
    const q = query(this.ds.productRef(), where("category", "array-contains", "Clothing"));
    const querySnapshot = await getDocs(q);
    return pushToArray(querySnapshot);
  }

  // async fetchProductDetails(id: string) {
  //   const docRef = doc(this.ds.productRef(), id);
  //   const docSnap = await getDoc(docRef);

  //   if (docSnap.exists()) {
  //     console.log("Document data:", docSnap.data());
  //   } else {
  //     console.log("No such document!");
  //   }
  // }
}
