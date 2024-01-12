import { Injectable } from '@angular/core';
import {  query, getDocs, getDoc, doc } from 'firebase/firestore';
import { DataService } from '../store/shared/services/data.service';
import { pushToArray } from '../store/shared/services/mapping.service';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  constructor(
    private ds: DataService,
  ) {}

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
      console.log("No such document!");
    }
    return null;
  }
  

}
