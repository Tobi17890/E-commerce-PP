import { Injectable } from '@angular/core';
import {
  Firestore,
  WriteBatch,
  collection,
  doc,
  writeBatch,
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  collection(arg0: string) {
    throw new Error('Method not implemented.');
  }

  constructor(private db: Firestore) {}

  public field_kh: string = '';
  public field_en: string = '';
  public field_cn: string = '';
  public field_japan: string = '';


  batch(): WriteBatch {
    return writeBatch(this.db);
  }

  createId(collectionName?: string) {
    const docRef = collection(this.db, collectionName || 'users');
    const { id } = doc(docRef);
    return id;
  }

  provincesRef() {
    return collection(this.db, `geo_provinces`);
  }

  districtsRef() {
    return collection(this.db, `geo_districts`);
  }

  communesRef() {
    return collection(this.db, `geo_communes`);
  }

  villagesRef() {
    return collection(this.db, `geo_villages`);
  }

  committeesRef() {
    return collection(this.db, `committees`);
  }

  countryRef() {
    return collection(this.db, `countries`);
  }
  healthSymptomsRef() {
    return collection(this.db, 'health_symptoms');
  }

  usersRef(docId?: string | null) {
    return doc(this.db, `users${docId ? `/${docId}` : ``}`);
  }

  settingsRef() {
    return doc(this.db, `settings/general`);
  }

  settingEformRef(){
    return doc(this.db, `settings/eform`);
  }

  collectionRef(collectionName: string) {
    return collection(this.db, collectionName);
  }
  eformUsersRef() {
    return collection(this.db, 'e_form_users');
  }

  displayFn(
    lang: string,
    field_kh: string,
    field_en: string,
    field_cn: string,
    field_japan: string,
  ): any {
    if (lang && field_kh && field_en && field_cn && field_japan) {
      switch (lang) {
        case 'kh':
          return (user: any) => {
            return user ? user[field_kh] : '';
          };
        case 'en':
          return (user: any) => {
            return user ? user[field_en] : '';
          };
        case 'cn':
          return (user: any) => {
            return user ? user[field_cn] : '';
          };
          case 'cn':
            return (user: any) => {
              return user ? user[field_japan] : '';
            };
        default:
          return () => {
            return '';
          };
      }
    }
    return () => {
      return '';
    };
  }

  chatRef() {
    return collection(this.db, 'chat');
  }

  eformProfileRef(uid: string) {
    return collection(this.db, `e_form_users/${uid}/profiles`);
  }

  visaTypeRef() {
    return collection(this.db, `visa`);
  }

  camArrivalSubmissionRef() {
    return collection(this.db, `cam_arrival_movement`);
  }

  tutorialRef() {
    return collection(this.db, `tutorials`);
  }

  homeSettingRef() {
    return collection(this.db, `arrival_homes_setting`);
  }

  unitRef() {
    return collection(this.db, `good_units`);
  }

  currencyRef() {
    return collection(this.db, `good_currency`);
  }
  arrivalNewsRef() {
    return collection(this.db, `arrival_news`);
  }
  arrivalcontactsRef() {
    return collection(this.db, `support_contacts`);
  }

  catogryRef() {
    return collection(this.db, `categories`);
  }

  userRef() {
    return collection(this.db, `users`);
  }

  adminRef() {
    return collection(this.db, `admin`);
  }

  productRef() {
    return collection(this.db, `products`);
  }

  checkoutRef() {
    return collection(this.db, `checkout`);
  }
}
