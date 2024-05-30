import { Injectable } from '@angular/core';
import { Firestore, query, getDocs } from 'firebase/firestore';
import { NgModule } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { pushToArray } from '../shared/services/mapping.service';

@NgModule({
    
})

@Injectable()
export class UserStore {
  isKhmer: boolean = false;
//   basePath: string = '/e-arrival/cambodian/';
//   rootParams$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
//   selectedProfileForm$: BehaviorSubject<IProfile> =
//     new BehaviorSubject<IProfile>(null);
//   goodsToDeclare$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

//   groupProfiles: any = [];

//   listingSize: number = 20;
//   groupData$: BehaviorSubject<{
//     name: string;
//     movement: ICamArrivalMovement;
//     profiles: IProfile[];
//   }> = new BehaviorSubject<{
//     name: string;
//     movement: ICamArrivalMovement;
//     profiles: IProfile[];
//   }>(null);
//   guestUidGuard: string = null;
  constructor(
    private ds: DataService,
    private db: Firestore
  ) {}

  async getUser() {
    const queryRef = query(this.ds.userRef());
    return pushToArray(await getDocs(queryRef));
  }

//   async getSearchCountries(str: string) {
//     if (!str) return [];
//     const queryRef = query(
//       this.ds.countryRef(),
//       where('keywords', 'array-contains', str?.toLocaleUpperCase()),
//       limit(20)
//     );
//     return pushToArray(await getDocs(queryRef));
//   }

//   removeHyphen(item: string): string {
//     return item.replace(/-/g, ' ');
//   }

//   removeSpace(item: string): string {
//     return encodeURIComponent(item).replace(/%20/g, '-');
//   }

//   createId() {
//     return this.ds.createId();
//   }

//   saveProfile(data: any) {
//     const { profile } = this.auth;
//     const ref = doc(this.ds.eformProfileRef(profile?.key), data?.key);
//     return setDoc(ref, data);
//   }
//   async getMohCountry() {
//     const queryRef = query(
//       this.ds.countryRef(),
//       where('is_moh_alert_country', '==', true),
//       orderBy('en_short_name')
//     );
//     return pushToArray(await getDocs(queryRef));
//   }
//   async getHealthSymptoms() {
//     const ref = query(this.ds.healthSymptomsRef(), orderBy('order'));
//     return pushToArray(await getDocs(ref));
//   }

//   async getVisaType() {
//     const ref = query(this.ds.visaTypeRef(), orderBy('order'));
//     return pushToArray(await getDocs(ref));
//   }
//   async getAllCountry() {
//     const queryRef = query(this.ds.countryRef(), orderBy('en_short_name'));
//     return pushToArray(await getDocs(queryRef));
//   }

//   async fetchDropdownData(
//     collectionName: string,
//     orderField?: string,
//     order?: OrderByDirection
//   ) {
//     const ref = collection(this.db, `${collectionName}`);
//     let queryConstraints: QueryConstraint[] = [
//       where('keywords', 'array-contains', '~N/A~'),
//       limit(20),

//     ];

//     if(orderField){
//       queryConstraints.push(orderBy(orderField, order))
//     }

//     const _query = query(ref, ...queryConstraints);
//     const data = pushToArray(await getDocs(_query));
//     return data;
//   }

//   async fetchFilterDropdownData(
//     collectionName: string,
//     text: any,
//     orderField: string,
//     order?: OrderByDirection
//   ) {
//     const ref = collection(this.db, `${collectionName}`);
//     let queryConstraints: QueryConstraint[] = [
//       limit(20),
//       orderBy(orderField, order),
//     ];
//     if (text && !text.key && (typeof text === 'string')) {
//       const search = text?.toUpperCase();
//       queryConstraints = [
//         ...queryConstraints,
//         where('keywords', 'array-contains', search),
//       ];
//     } else {
//       queryConstraints = [
//         ...queryConstraints,
//         where('keywords', 'array-contains', '~N/A~'),
//       ];
//     }

//     const _query = query(ref, ...queryConstraints);
//     const data = pushToArray(await getDocs(_query));
//     return data;
//   }

//   async getProvince() {
//     const queryRef = query(this.ds.provincesRef());
//     return pushToArray(await getDocs(queryRef));
//   }

//   async getDistrict(key: string) {
//     const ref = collection(this.db, `geo_districts`);
//     let queryConstraints: QueryConstraint[] = [
//       where('province.key', '==', key),
//     ];
//     const _query = query(ref, ...queryConstraints);
//     return pushToArray(await getDocs(_query));
//   }

//   async getCommune(key: string) {
//     const ref = collection(this.db, `geo_communes`);
//     let queryConstraints: QueryConstraint[] = [
//       where('district.key', '==', key),
//     ];
//     const _query = query(ref, ...queryConstraints);
//     return pushToArray(await getDocs(_query));
//   }

//   async getVillage(key: string) {
//     const ref = collection(this.db, `geo_villages`);
//     let queryConstraints: QueryConstraint[] = [where('commune.key', '==', key)];
//     const _query = query(ref, ...queryConstraints);
//     return pushToArray(await getDocs(_query));
//   }

//   async getEformProfiles(uid: string): Promise<IProfile[]> {
//     const queryRef = query(
//       this.ds.eformProfileRef(uid),
//       where('status.key', '==', STATUS_OBJ?.ACTIVE.key),
//       orderBy('givenName'),
//       limit(50)
//     );
//     return pushToArray(await getDocs(queryRef));
//   }

//   async getEformProfile(uid: string, key: string): Promise<IProfile> {
//     const ref = doc(this.ds.eformProfileRef(uid), key);
//     return pushToObject(await getDoc(ref)) as IProfile;
//   }

//   fetchEformProfileByKey(uid: string, key: string) {
//     const ref = doc(this.ds.eformProfileRef(uid), key);
//     return docData(ref) as Observable<IProfile>;
//   }

//   async searchEformProfile(uid: string, str: string): Promise<IProfile[]> {
//     const queryRef = query(
//       this.ds.eformProfileRef(uid),
//       where('status.key', '==', STATUS_OBJ?.ACTIVE.key),
//       where('keywords', 'array-contains', str?.trim()?.toLocaleUpperCase()),
//       limit(50)
//     );
//     return pushToArray(await getDocs(queryRef));
//   }

//   async getIndividualSubmissionDetail(headerKey: string) {
//     const queryRef = query(this.ds.camArrivalSubmissionRef(), where('isDeleted','==', false) , where('headerKey', '==', headerKey));
//     return pushToArray(await getDocs(queryRef));
//   }

//   fetchSubmissionDetails(headerKey: string){
//     const queryRef = query(this.ds.camArrivalSubmissionRef(), where('isDeleted','==', false) , where('headerKey', '==', headerKey));
//     return collectionData<any>(queryRef, {idField: 'key'}) as Observable<any[]>;
//   }

//   saveIndividualSubmission(headerData: any, detailData: any) {
//     const ref = this.ds.camArrivalSubmissionRef();
//     const batch = this.ds.batch();
//     if (headerData?.key) {
//       batch.set(doc(ref, headerData?.key), headerData, { merge: true });
//     }
//     batch.set(doc(ref, detailData?.key), detailData, { merge: true });
//     return batch.commit();
//   }

//   getProfile(callback: (listingData: any[]) => void) {
//     const { profile } = this.auth;
//     this.getEformProfiles(profile?.key).then((data) => {
//       const listingData = AtoZ_List(data, 'givenName');
//       callback(listingData);
//     });
//   }

//   async getUnits() {
//     return pushToArray(
//       await getDocs(query(this.ds.unitRef(), orderBy('text')))
//     );
//   }

//   async getCurrency() {
//     return pushToArray(
//       await getDocs(query(this.ds.currencyRef(), orderBy('name')))
//     );
//   }

//   fetchEformProfile(opt: {
//     uid: string;
//     lastVisible?: any;
//     searchText?: string;
//   }) {
//     const queryArr: any[] = [];
//     queryArr.push(
//       where('status.key', '==', STATUS_OBJ?.ACTIVE.key),
//       where('isDeleted', '==', false)
//     );
//     if (opt?.searchText) {
//       queryArr.push(
//         where(
//           'keywords',
//           'array-contains',
//           opt?.searchText?.toLocaleUpperCase()
//         )
//       );
//     } else {
//       if (opt?.lastVisible) {
//         queryArr.push(startAfter(opt?.lastVisible?.givenName));
//       }
//       queryArr.push(orderBy('givenName'), limit(this.listingSize));
//     }
//     return collectionData<any>(
//       query(this.ds.eformProfileRef(opt?.uid), ...queryArr),
//       { idField: 'key' }
//     ) as Observable<any[]>;
//   }

//   fetchEformIndividual(opt: {
//     uid: string;
//     lastVisible?: any;
//     searchText?: string;
//     param?: string;
//     isKhmerCitizen?: boolean;
//     serverDateTime?: any;
//   }) {
//     const queryArr: any[] = [];
//     const startOfDate = startAndEndDateOfDay(opt?.serverDateTime)?.startDate;
//     queryArr.push(
//       where('isDeleted', '==', false),
//       where('type.key', '==', EFORM_TYPE.INDIVIDUAL?.key),
//       where('isHeader', '==', true),
//       where('created_by', '==', opt?.uid),
//       where('isKhmerCitizen', '==', opt?.isKhmerCitizen)
//     );
//     if (opt?.searchText) {
//       queryArr.push(
//         where(
//           'keywords',
//           'array-contains',
//           opt?.searchText?.toLocaleUpperCase()
//         )
//       );
//     } else {
//       switch (opt?.param) {
//         case 'all':
//           break;
//         case 'submitted':
//           queryArr.push(
//             where('status.key', '==', STATUS_OBJ?.ACTIVE.key),
//             where('dateOfArrival', '>=', startOfDate),
//             orderBy('dateOfArrival')
//           );
//           break;
//         case 'draft':
//           queryArr.push(where('status.key', '==', STATUS_OBJ?.PENDING.key));
//           break;
//         case 'expired':
//           queryArr.push(
//             where('status.key', '==', STATUS_OBJ?.ACTIVE.key),
//             where('dateOfArrival', '<', startOfDate),
//             orderBy('dateOfArrival')
//           );
//           break;
//       }
//       queryArr.push(orderBy('updated_at', 'desc'), limit(this.listingSize));
//       if (opt?.lastVisible) {
//       }
//     }
//     return collectionData<any>(
//       query(this.ds.camArrivalSubmissionRef(), ...queryArr),
//       { idField: 'key' }
//     ) as Observable<any[]>;
//   }

//   async fetchEformSearchSubmittedActive(opt: {
//     uid: string;
//     searchText?: string;
//     isKhmerCitizen?: boolean;
//     serverDateTime?: any;
//   }) {
//     const queryArr: any[] = [
//       where('isDeleted', '==', false),
//       where('isHeader', '==', true),
//       where('created_by', '==', opt?.uid),
//       where('isKhmerCitizen', '==', opt?.isKhmerCitizen),
//       where('status.key', '==', STATUS_OBJ?.ACTIVE.key),
//       where(
//         'dateOfArrival',
//         '>=',
//         startAndEndDateOfDay(opt?.serverDateTime)?.startDate
//       ),
//       where('keywords', 'array-contains', opt?.searchText?.toLocaleUpperCase()),
//       orderBy('dateOfArrival'),
//       limit(this.listingSize),
//     ];

//     const submissionRef = this.ds.camArrivalSubmissionRef();
//     const querySnapshot = await getDocs(query(submissionRef, ...queryArr));
//     return querySnapshot.docs.map(doc => ({ key: doc.id, ...doc.data() }));
//   }

//   async fetchEformSearchIndividual(opt: {
//     uid: string;
//     searchText?: string;
//     isKhmerCitizen?: boolean;
//   }) {
//     const queryArr: any[] = [
//       where('isDeleted', '==', false),
//       where('type.key', '==', EFORM_TYPE.INDIVIDUAL?.key),
//       where('isHeader', '==', true),
//       where('created_by', '==', opt?.uid),
//       where('isKhmerCitizen', '==', opt?.isKhmerCitizen),
//       where('keywords', 'array-contains', opt?.searchText?.toLocaleUpperCase()),
//     ];

//     const submissionRef = this.ds.camArrivalSubmissionRef();
//     const querySnapshot = await getDocs(query(submissionRef, ...queryArr));
//     return querySnapshot.docs.map(doc => ({ key: doc.id, ...doc.data() }));
//   }

//   async fetchEformSearchGroup(opt: {
//     uid: string;
//     searchText?: string;
//     isKhmerCitizen?: boolean;
//   }) {
//     const queryArr: any[] = [
//       where('isDeleted', '==', false),
//       where('type.key', '==', EFORM_TYPE.GROUP?.key),
//       where('isHeader', '==', true),
//       where('created_by', '==', opt?.uid),
//       where('isKhmerCitizen', '==', opt?.isKhmerCitizen),
//       where('keywords', 'array-contains', opt?.searchText?.toLocaleUpperCase()),
//     ];

//     const submissionRef = this.ds.camArrivalSubmissionRef();
//     const querySnapshot = await getDocs(query(submissionRef, ...queryArr));
//     return querySnapshot.docs.map(doc => ({ key: doc.id, ...doc.data() }));
//   }

//   async fetchEformSearchProfile(opt: { uid: string; searchText?: string }) {
//     const queryArr: any[] = [
//       where('status.key', '==', STATUS_OBJ?.ACTIVE.key),
//       where('isDeleted', '==', false),
//       where('keywords', 'array-contains', opt?.searchText?.toLocaleUpperCase()),
//     ];

//     const querySnapshot = await getDocs(query(this.ds.eformProfileRef(opt?.uid), ...queryArr));
//     return querySnapshot.docs.map(doc => ({ key: doc.id, ...doc.data() }));
//   }



//   fetchEformGroup(opt: {
//     uid: string;
//     lastVisible?: any;
//     searchText?: string;
//     param?: string;
//     isKhmerCitizen?: boolean;
//     serverDateTime?: any;
//   }) {
//     const queryArr: any[] = [];
//     const startOfDate = startAndEndDateOfDay(opt?.serverDateTime)?.startDate

//     queryArr.push(
//       where('isDeleted', '==', false),
//       where('type.key', '==', EFORM_TYPE.GROUP?.key),
//       where('isHeader', '==', true),
//       where('created_by', '==', opt?.uid),
//       where('isKhmerCitizen', '==', opt?.isKhmerCitizen)
//     )

//     if (opt?.searchText) {
//       queryArr.push(
//         where('keywords', 'array-contains', opt?.searchText?.toLocaleUpperCase()),
//       )
//     } else {
//       switch (opt?.param) {
//         case 'all':

//           break;
//         case 'submitted':
//           queryArr.push(
//             where('status.key', '==', STATUS_OBJ?.ACTIVE.key),
//             where('dateOfArrival', '>=', startOfDate),
//             orderBy('dateOfArrival'),
//           )
//           break;
//         case 'draft':
//           queryArr.push(where('status.key', '==', STATUS_OBJ?.PENDING.key))
//           break;
//         case 'expired':
//           queryArr.push(
//             where('status.key', '==', STATUS_OBJ?.ACTIVE.key),
//             where('dateOfArrival', '<', startOfDate),
//             orderBy('dateOfArrival'),
//           )
//           break;
//       }
//       queryArr.push(
//         orderBy('updated_at', 'desc'),
//         limit(this.listingSize)
//       )
//       if (opt?.lastVisible) {
//         queryArr.push(startAfter(opt?.lastVisible?.updated_at));
//       }

//     }
//     return collectionData<any>(query(this.ds.camArrivalSubmissionRef(), ...queryArr), { idField: 'key' }) as Observable<any[]>;
//   }

//   fetchEformSubmittedActive(opt: {
//     uid: string;
//     lastVisible?: any;
//     searchText?: string;
//     isKhmerCitizen?: boolean;
//     serverDateTime?: any;
//   }) {
//     const queryArr: any[] = [];
//     const startOfDate = startAndEndDateOfDay(opt?.serverDateTime)?.startDate;
//     queryArr.push(
//       where('isDeleted', '==', false),
//       where('isHeader', '==', true),
//       where('created_by', '==', opt?.uid),
//       where('isKhmerCitizen', '==', opt?.isKhmerCitizen),
//       where('status.key', '==', STATUS_OBJ?.ACTIVE.key),
//       where('dateOfArrival', '>=', startOfDate)
//     );
//     queryArr.push(orderBy('dateOfArrival'), limit(this.listingSize));
//     if (opt?.searchText) {
//       queryArr.push(
//         where(
//           'keywords',
//           'array-contains',
//           opt?.searchText?.toLocaleUpperCase()
//         )
//       );
//     } else {
//       if (opt?.lastVisible) {
//         queryArr.push(startAfter(opt?.lastVisible?.dateOfArrival));
//       }
//     }
//     return collectionData<any>(
//       query(this.ds.camArrivalSubmissionRef(), ...queryArr),
//       { idField: 'key' }
//     ) as Observable<any[]>;
//   }

//   saveGroupSubmission(headerData: any, detailData: any[],deleteItem?: any) {
//     const ref = this.ds.camArrivalSubmissionRef();
//     const batch = this.ds.batch();
//     if (headerData?.key) {
//       batch.set(doc(ref, headerData?.key), headerData, { merge: true });
//     }
//     detailData?.forEach((item) => {
//       batch.set(doc(ref, item?.key), item, { merge: true });
//     });
//     if(deleteItem?.key){
//       batch.update(doc(ref, deleteItem?.key), { isDeleted: true, status: STATUS_OBJ?.DELETED, updated_at: serverTimestamp()});
//     }
//     return batch.commit();
//   }

//   async getEformSetting(){
//     const ref = this.ds.settingEformRef();
//     return pushToObject(await getDoc(ref));
//   }

//   removeGroupDetail(item: any) {
//     const { profile } = this.auth
//     const ref = this.ds.camArrivalSubmissionRef();
//     const batch = this.ds.batch();
//     const data = {
//       status: STATUS_OBJ?.DELETED,
//       isDeleted: true,
//       updated_at: serverTimestamp(),
//       updated_by: profile?.key
//     }
//     if(item?.profile_type?.key === PROFILE_TYPE.LEADER?.key) {
//       const headerData = {
//         key: item?.headerKey,
//         groupLeader: null,
//         updated_at: serverTimestamp(),
//       }
//       batch.update(doc(ref, item?.headerKey), headerData);
//     }
//     batch.update(doc(ref, item?.key), data);
//     return batch.commit();
//   }


//   async getProfileFromKeys(keys: string[]) {
//     const { profile } = this.auth
//     const checked = chunkData(keys,10)
//     let temp = [];
//     for await(let items of checked) {
//       const ref = query(this.ds.eformProfileRef(profile?.key), where('key', 'in', items));
//       temp = temp.concat(pushToArray(await getDocs(ref)))
//     }
//     return temp;
//   }

//   async getEformSubmittedHeaderByKey(key: string){
//     const ref = this.ds.camArrivalSubmissionRef();
//     return pushToObject(await getDoc(doc(ref, key)));
//   }

//   fetchSelectedDetail(key: string){
//     const ref = this.ds.camArrivalSubmissionRef();
//     return docData(doc(ref, key)) as Observable<any>;
//   }

//   async searchEArrival(options: {
//     passport?: string;
//     dob?: number;
//     passport_expiry_date?: Date;
//   }) {
//     const startDate = new Date(
//       options?.passport_expiry_date?.setHours(0, 0, 0, 0)
//     );
//     const endDate = new Date(
//       options?.passport_expiry_date?.setHours(23, 59, 59, 999)
//     );
//     const queryRef = query(
//       this.ds.camArrivalSubmissionRef(),
//       where('passportNumber', '==', options?.passport),
//       where('dob_key', '==', options?.dob),
//       where('status.key', '==', STATUS_OBJ?.ACTIVE.key),
//       where('isHeader', '==', false),
//       orderBy('passportExpiry'),
//       where('passportExpiry', '>=', startDate),
//       where('passportExpiry', '<=', endDate),
//       orderBy('dateOfArrival', 'desc'),
//       limit(1)
//     );
//     return pushToArray(await getDocs(queryRef));
//   }

//   async getContactSettings(){
//     const ref = this.ds.arrivalcontactsRef();
//     return pushToArray(await getDocs(ref));
//   }

//   deleteEformUserProfile(uid: string,item: any) {
//     const ref = doc(this.ds.eformProfileRef(uid), item?.key);
//     return updateDoc(ref, { isDeleted: true, status: STATUS_OBJ?.DELETED, updated_at: serverTimestamp() });
//   }

//   async deleteSubmission(groupKey: string){
//     const docRef = doc(this.ds.camArrivalSubmissionRef(), groupKey);
//     return updateDoc(docRef, { isDeleted: true, status: STATUS_OBJ?.DELETED, updated_at: serverTimestamp() })
//   }

}
