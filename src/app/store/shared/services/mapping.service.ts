import {
  collectionData,
  CollectionReference,
  DocumentData,
  DocumentSnapshot,
  query,
  limit,
  where,
  QuerySnapshot,
} from '@angular/fire/firestore';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { map, take, debounceTime, startWith } from 'rxjs/operators';
import * as moment from 'moment';
import * as _ from 'lodash';

export interface INodeData {
  parent_node: string | null;
  node_name: string;
  node_order: number;
  node_level: number;
}

export function chunkData(items: any, size: number) {
  return _?.chunk(items, size);
}

export function autoComplete(
  stateCtrl: AbstractControl,
  data: any,
  field: string,
  checkField?: string
) {
  return stateCtrl.valueChanges.pipe(
    startWith(``),
    map((state) =>
      state ? filterStates(data, stateCtrl?.value, field,checkField) : data?.slice()?.slice(0,50)
    )
  );
}

export function filterStates(data: any[], value: any, field: string, checkField?: any): any[] {
  if (value?.key || value?.id || value[checkField]) {
    return data.slice(0,50);
  }
  return data?.filter((state) => {
    return (
      state &&
      state[field] &&
      `${state[field]}`?.toLowerCase()?.indexOf(`${value?.toLowerCase()}`) > -1
    );
  }).slice(0,50);
}


export function toUserAccount(item: any) {
  const obj = toNull(item);
  if (obj) {
    return {
      key: item.key,
      displayName: `${item?.last_name} ${item?.first_name}`,
      file: item?.file || item?.photo || null,
    };
  } else return null;
}

export function checkExistData(
  collectionRef: CollectionReference<DocumentData>,
  field: string,
  currentValue: any,
  sensitive?: boolean
) {
  return (control: AbstractControl) => {
    const value = control?.value || null;
    const appQuery = query(
      collectionRef,
      where(
        field,
        '==',
        value ? (sensitive ? toSensitive(value) : `${value}`?.trim()) : null
      ),
      limit(1)
    );
    const ref = collectionData(appQuery);
    return ref.pipe(
      debounceTime(500),
      take(1),
      map((arr:any) => {
        const doc = arr?.find((m:any) => m && m[field] === currentValue);
        if (currentValue && doc) {
          return null;
        }
        const val = arr.length > 0 ? { valueExist: true } : null;
        return val;
      })
    );
  };
}

export function checkExistDataNumber(
  collectionRef: CollectionReference<DocumentData>,
  field: string,
  currentValue: any,
  sensitive?: boolean
) {
  return (control: AbstractControl) => {
    const value = control?.value || null;
    const appQuery = query(
      collectionRef,
      where(
        field,
        '==',
        value ? (sensitive ? toSensitive(value) : value) : null
      ),
      limit(1)
    );
    const ref = collectionData(appQuery);
    return ref.pipe(
      debounceTime(500),
      take(1),
      map((arr:any) => {
        const doc = arr?.find((m:any) => m && m[field] === currentValue);
        if (currentValue && doc) {
          return null;
        }
        const val = arr.length > 0 ? { valueExist: true } : null;
        return val;
      })
    );
  };
}

export function validSelected(control: AbstractControl): any | null {
  const value = control.value;
  if (value !== undefined && value !== null && value !== '') {
    if (!value.key && !value.id) {
      return { validKey: true };
    }
  }
}

export function validSelectedNoKey(control: AbstractControl): any | null {
  const value = control.value;
  if (value !== undefined && value !== null && value !== '') {
    if (!value.key && !value.id && !value.name && !value.text) {
      return { validKey: true };
    }
  }
}

export function toNumber(value: any) {
  if (value === null || value === '' || value === undefined) {
    return 0;
  }
  if (Number.isNaN(Number(value))) return 0;
  if (typeof value === 'number') return value;
  return Number(value);
}

export function toNull(value: any) {
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && value === 'undefined') return null;
  if (!value || value === null || value === '' || value === undefined) {
    return null;
  }
  return value;
}

export function pushToObject(doc: DocumentSnapshot<DocumentData>): any {
  if (!doc.exists) return null;
  return { ...doc?.data() };
}

export function pushToArray(doc: QuerySnapshot<DocumentData>): any[] {
  if (doc.empty) return [];
  return doc?.docs?.map((m) => {
    return { ...m.data() };
  });
}

export function pushObjArray(data: Array<any>, newItem: any) {
  let value: any[] = data;
  if (data.length > 0) {
    const exist = data.find((m) => m.key === newItem.key);
    if (exist) {
      const index = data.findIndex((obj) => obj?.key == newItem?.key);
      value[index] = newItem;
    } else {
      value.push(newItem);
    }
  } else {
    value.push(newItem);
  }
  return value;
}

export function toCaseTrim(name: string) {
  return `${name}`.replace(/\s/g, '').trim().toLocaleUpperCase();
}

export function toUpperCaseTrim(name: string) {
  return `${name}`.replace(/\s/g, '').trim().toLocaleUpperCase();
}

export function toSensitive(name: string) {
  return `${name}`.replace(/\s/g, '').trim().toLocaleUpperCase();
}

export function orderListFormat(number: any) {
  const num = toNumber(number);
  const remainZero = `00000`.substring(0, 5 - `${num}`.length);
  return `${remainZero}${num}`;
}

export function renderImage(image: any, callback: (result: any) => void) {
  const reader = new FileReader();
  reader.readAsDataURL(image);
  reader.onload = (event) => {
    callback?.(event?.target?.result);
  };
}

export function toUserProfile(user: any) {
  return {
    key: user?.key,
    displayName: user?.displayName || null,
    photoFile: user?.photoFile?.downloadUrl
      ? { downloadUrl: user?.photoFile?.downloadUrl }
      : null,
  };
}

export function toNameAndKey(item: any) {
  if (!item) return null;
  return {
    key: item?.key,
    name: item?.name || null,
  };
}

export function toDateKey(date?: Date) {
  return Number(moment(date).format('YYYYMMDD'));
}

export function toDateICAO(date: Date) {
  return Number(moment(date).format('YYYYMMDD'));
}

export function toDateFromICAO(date: string): Date | null {
  return moment(date, 'YYYYMMDD')?.toDate();
}

export function getGender(): any[] {
  return [
    { key: 1, text: 'Male', name: 'ប្រុស', short_name: 'ប' },
    { key: 2, text: 'Female', name: 'ស្រី', short_name: 'ស' },
  ];
}

export function pageKey() {
  return Number(moment().format('YYYYMMDDHHmmss'));
}

export function toYearKey(date: Date) {
  return moment(date).format('YY');
}

export function toLatinNumber(num: any) {
  let value = null;
  const numStr = `${num}`;
  switch (numStr) {
    case '០':
      value = 0;
      break;
    case '0':
      value = 0;
      break;
    case '១':
      value = 1;
      break;
    case '1':
      value = 1;
      break;
    case '២':
      value = 2;
      break;
    case '2':
      value = 2;
      break;
    case '៣':
      value = 3;
      break;
    case '3':
      value = 3;
      break;
    case '៤':
      value = 4;
      break;
    case '4':
      value = 4;
      break;
    case '៥':
      value = 5;
      break;
    case '5':
      value = 5;
      break;
    case '៦':
      value = 6;
      break;
    case '6':
      value = 6;
      break;
    case '៧':
      value = 7;
      break;
    case '7':
      value = 7;
      break;
    case '៨':
      value = 8;
      break;
    case '8':
      value = 8;
      break;
    case '៩':
      value = 9;
      break;
    case '9':
      value = 9;
      break;
    default:
      break;
  }
  return value;
}

export function dateNumToDateString(value: any) {
  const dateStr =
    value.toString().length === 8 ? value.toString() : `0${toNumber(value)}`;
  const m: any = dateStr.match(/(\d\d)(\d\d)(\d\d\d\d)/);
  return new Date(m[3], m[2] - 1, m[1]);
}

export function toDateString(
  date: string,
  format: string = 'DD/MM/YYYY'
): Date | null {
  if (!date) return null;
  let dateString = ``;
  const dateItems = `${date}`.split('/');
  const dateDashItems = `${date}`.split('-');
  if (dateItems.length > 1) {
    dateItems?.map((m, i) => {
      if (i === dateItems.length - 1)
        return (dateString = dateString + `${toSensitive(m) ? m : '01'}`);
      return (dateString = dateString + `${toSensitive(m) ? m : '01'}/`);
    });
  } else if (dateDashItems?.length > 1) {
    dateDashItems?.map((m, i) => {
      if (i === dateDashItems.length - 1)
        return (dateString = dateString + `${toSensitive(m) ? m : '01'}`);
      return (dateString = dateString + `${toSensitive(m) ? m : '01'}/`);
    });
    return moment(dateString, 'YYYY/MM/DD').toDate();
  }
  return moment(dateString, format).toDate();
}

export function dateToString(date: Date) {
  return moment(date).format('DD/MM/YYYY');
}

export function toDateSql(
  date: string,
  format: string = 'DD/MM/YYYY'
): string | null {
  if (!date) return null;
  return moment(date).format(format);
}

export function toKeyAndName(item: any) {
  return { key: item?.key, name: item?.name || null };
}

export function toGeoData(item: any) {
  if (!item) return null;
  const { key, name, en_name, geo_id, geo_prefix, id } = item;
  return {
    key,
    name,
    en_name: en_name || null,
    geo_id: geo_id || id,
    geo_prefix: geo_prefix || null,
  };
}

export function orderByArray(
  data: Array<any>,
  field: string,
  orders?: _.Many<boolean | 'asc' | 'desc'>
) {
  return _.orderBy(data, [field], orders);
}

export function toCapitalize(value: any) {
  let string = null;
  if (value && value !== '') string = value.toString().toUpperCase().trim();
  return string;
}

export const createKeywords = (name: any) => {
  let arrName: any = [];
  let curName = '';
  let nextName = '';
  String(name)
    .trim()
    .split(/[ .\-_ ]/)
    .forEach((letter) => {
      curName += letter;
      arrName.push(toCapitalize(letter));
      arrName.push(toCapitalize(curName));
    });

  String(name)
    .split('')
    .forEach((letter) => {
      nextName += letter;
      arrName.push(toCapitalize(nextName));
    });

  return arrName;
};

export function generateKeywords(names: string[]) {
  const keywordName = _.flattenDeep(
    _.map(names, (m: any) => createKeywords(m))
  ).filter((a: any) => a);
  return [...new Set(['~N/A~', ...keywordName])];
}

export function toLocaleNumber(num: number, digit?: number) {
  if (typeof num !== 'number') return null;
  var numInteger = num;
  var numString = numInteger?.toString();
  if (digit && digit > 0 && numString?.length < digit) {
    numString = '0' + numString;
  }
  var khmerNumber = '';
  var numbersKhmer = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
  for (var i = 0; i < numString.length; i++) {
    khmerNumber += numbersKhmer[parseInt(numString[i])];
  }
  return khmerNumber;
}

export function toKhmerNumber(num: string): number {
  const khNumbers = ['០', '១', '២', '៣', '៤', '៥', '៦', '៧', '៨', '៩'];
  let engNumber = '';

  for (let i = 0; i < num.length; i++) {
    // Get index of current digit in khNumbers
    let index = khNumbers.indexOf(num[i]);

    // Add English version to string
    engNumber += index;
  }

  return parseInt(engNumber);
}

export function toUniq(data: Array<any>): any[] {
  const rows = _.uniq(data);
  return rows;
}

export function groupByArray(
  data: Array<any>,
  field: string,
  orderBy: _.Many<'asc' | 'desc'>
) {
  const rows = _.uniqBy(data, field);
  return _.orderBy(rows, [field], orderBy);
}

export function toFlatten(rows: Array<any>): any[] {
  return _.flatten(rows);
}

export function getYearsList(length: number) {
  const getCurrentYear = new Date().getFullYear(); // current year
  return Array.from({ length: length }, (_, i) => getCurrentYear - i);
}

export function calculateDiff(start_date: string, end_date: string) {
  // Convert the strings to Date objects
  let fromDate = new Date(start_date);
  let toDate = new Date(end_date);

  // Get the difference in milliseconds
  let diffInTime = toDate.getTime() - fromDate.getTime();

  // Convert the milliseconds to days
  let diffInDays = diffInTime / (1000 * 60 * 60 * 24);

  // Return the result
  return diffInDays;
}
export function DateLessThanValidator(dateCompareControlName: string) {
  let thisDateControl: AbstractControl;
  let otherDateControl: AbstractControl;
  return function DateLessThanOrEqualsValidate(
    control: AbstractControl
  ): ValidationErrors | null {
    if (!control.parent) {
      return null;
    }
    if (!thisDateControl) {
      thisDateControl = control;
      otherDateControl = control.parent.get(
        dateCompareControlName
      ) as AbstractControl;
      if (!otherDateControl) {
        throw new Error(
          'dateLessThanValidator(): other control is not found in parent group'
        );
      }
      otherDateControl.valueChanges.subscribe(() => {
        thisDateControl.updateValueAndValidity();
      });
    }
    if (!otherDateControl || !otherDateControl.value) {
      return null;
    }
    const date1 = thisDateControl.value;
    const date2 = otherDateControl.value;
    if (date1 !== null && date2 !== null && date1 > date2) {
      return {
        date_less_than: true,
      };
    }
    return null;
  };
}

export function ValidatorWhitespace(control: FormControl) {
  const value = control?.value;
  if (value !== undefined && value !== null && typeof value === 'string') {
    if (!value?.trim()?.length) {
      return { whitespace: true };
    }
  }
  return null;
}


export function ValidatorPhoneWithoutZeroStart(control: FormControl) {
  const value = control.value;
  if (value !== undefined && value !== null) {
    if(value?.toString()?.startsWith('0')){
      return { phone: true };
    }
    if(!Number(value)){
      return { phone: true };
    }
  }
  return null;
}


export function toCountry(country: any){
  if(!country) return null
  return {
    alpha_3_code: country?.alpha_3_code || null,
    en_nationality: country?.en_nationality || null,
    en_short_name: country?.en_short_name || null,
    id: country?.id || null,
    key: country?.key || null,
    kh_nationality: country?.kh_nationality || null,
    kh_short_name: country?.kh_short_name || null,
    nationality: country?.nationality || null,
  }
}

export function toPhoneCountryCode(item: any){
  if(!item) return null
  return {
    abbreviation: item?.abbreviation || null,
    callingCode: item?.callingCode || null,
    name: item?.name || null,
  }
}

export function toSocialOption(item: any){
  if(!item) return null
  return {
    image: item?.image || null,
    key: item?.key || null,
    text: item?.text || null,
  }
}


export function uniqArray(array: any) {
  return _.uniqBy(array, (item: any) => {
      return item.key || item.id;
  });
}

export function toDateDMY(date: any) {
  return moment(date).format('DD/MM/YYYY')
}


export function formatFormDate(date?: Date | any): Date | null | undefined {
  if (!date) return undefined;
  if (typeof date === 'object' && 'toDate' in date) {
    return date.toDate()
  }
  if (typeof date === 'object' && 'isEqual' in date) {
    return new Date()
  }
  if ((typeof date === 'object' && Object.keys(date).length > 0) && moment(date).isValid() ||
    (typeof date?.toString === 'function' && moment(date).isValid())) {
    const objField = Object.keys(date)
    if (objField.includes("_seconds") || objField.includes("seconds")) {
      return moment.unix((date as any)._seconds || (date as any).seconds).toDate()
    }
    return moment(date).toDate()
  }
  if ((typeof date === 'object' && Object.keys(date).length > 0)) {
    const objField = Object.keys(date)
    if (objField.includes("_seconds") || objField.includes("seconds")) {
      return moment.unix((date as any)._seconds || (date as any).seconds).toDate()
    }
  }
  if (moment(date).isValid()) {
    return moment(date).toDate()
  }
  return undefined
}


export function toGroupLeader(data: any){
  if(!data) return null;
  return {
    dateOfBirth : data?.dateOfBirth || null,
    dob_key: data?.dob_key || null,
    gender: data?.gender || null,
    givenName: data?.givenName || null,
    key: data?.key || null,
    nationality: data?.nationality || null,
    passportNumber: data?.passportNumber || null,
    photo: data?.photo || null,
    surname: data?.surname || null,
    passportExpiryKey: data?.passportExpiryKey
  }
}

export function toProfileEform(data: any){
  if(!data) return null;
  else return {
    passport: data?.passport || null,
    photo: data?.photo || null,
    passportNumber: data?.passportNumber || null,
    passportExpiry: data?.passportExpiry || null,

    surname: data?.surname || null,
    givenName: data?.givenName || null,
    gender: data?.gender || null,
    dateOfBirth: data?.dateOfBirth || null,
    dob_key: data?.dob_key || null,
    birthCountry: data?.birthCountry ? toCountry(data?.birthCountry) : null,
    nationality: data?.nationality ? toCountry(data?.nationality) : null ,
    phoneCountryCode: data?.phoneCountryCode ? toPhoneCountryCode(data?.phoneCountryCode)  : null,
    phoneNumber: data?.phoneNumber || null,
    email: data?.email || null,

    occupation: data?.occupation || null,
    socialOption: data?.socialOption ? toSocialOption(data?.socialOption) : null,
    socialText: data?.socialText || null,
  }
}

export function toVisaType(data: any){
  if(!data) return null;
  return {
    borderVisaTypeId: data?.borderVisaTypeId || null,
    code: data?.code || null,
    fee_usd: data?.fee_usd || null,
    key: data?.key || null,
    name: data?.name || null,
    name_en: data?.name_en || null,
  }
}

export function AtoZ_List(list: any, field: string){
  const az = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]
  let temp = []
  for(let item of az){
    const data = {
      name : item?.toLocaleUpperCase(),
      list : list?.filter((m:any) => m[field]?.toLocaleUpperCase()?.startsWith(item?.toLocaleUpperCase()))
    }
    if(data?.list?.length > 0){
      temp.push(data)
    }
  }
  return temp;
}


export function fromNow(date: Date, kh: boolean = false) {
  const AT = kh ? 'នៅ' : 'at'
  return moment(date).calendar('', {
    sameDay: `[${kh ? moment(date).locale("km").fromNow() : moment(date).fromNow()}]`,
    nextDay: `[${kh ? 'ថ្ងៃស្អែក' : 'Tomorrow'}] [${AT}] h:mm A`,
    nextWeek: `dddd [${AT}] h:mm A`,
    lastDay: `[${kh ? 'ម្សិលមិញ' : 'Yesterday'}] [${AT}] h:mm A`,
    lastWeek: `MMM DD [${AT}] h:mm A`,
    sameElse: `MMM DD [${AT}] h:mm A`
  });
}

export function toProvince(data: any){
  if(!data) return null;
  return {
    key: data?.key || null,
    name: data?.name || null,
    en_name: data?.en_name || null,
    geo_id: data?.geo_id || null,
    geo_prefix: data?.geo_prefix || null,
  }
}

export function toCityData(data: any){
  if(!data) return null;
  return {
    city: data?.city || null,
    country: data?.country ? toCountry(data?.country) : null,
    id: data?.id || null,
    key: data?.key || null,
    lat: data?.lat || null,
    lng: data?.lng || null,
  }
}


export function toUnit(data: any){
  if(!data) return null;
  return {
    code: data?.code || null,
    key: data?.key || null,
    text: data?.text || null,
  }
}

export function toCurrency(data: any){
  if(!data) return null;
  return {
    code: data?.code || null,
    key: data?.key || null,
    name: data?.name || null,
  }
}

export function startAndEndDateOfDay(date: Date) {
  const momentDateKey = moment(date);
  return {
    startDate: momentDateKey.startOf('days').toDate(),
    endDate: momentDateKey.endOf('days').toDate(),
  }
}


export function eformGroupDetailToProfile(data: any){
  if(!data) return null;
  else return {
    key: data?.profile_key || null,

    passport: data?.passportNumber || null,
    photo: data?.photo || null,
    passportNumber: data?.passportNumber || null,
    passportExpiry: data?.passportExpiry || null,

    surname: data?.surname || null,
    givenName: data?.givenName || null,
    gender: data?.gender || null,
    dateOfBirth: data?.dateOfBirth || null,
    dob_key: data?.dob_key || null,
    birthCountry: data?.birthCountry ? toCountry(data?.birthCountry) : null,
    nationality: data?.nationality ? toCountry(data?.nationality) : null ,
    phoneCountryCode: data?.phoneCountryCode ? toPhoneCountryCode(data?.phoneCountryCode)  : null,
    phoneNumber: data?.phoneNumber || null,
    email: data?.email || null,

    occupation: data?.occupation || null,
    socialOption: data?.socialOption ? toSocialOption(data?.socialOption) : null,
    socialText: data?.socialText || null,

    keywords: [(data?.surname + data?.givenName)?.toLocaleUpperCase(),data?.passportNumber].concat(generateKeywords([data?.surname, data?.givenName])),
  }
}


export const calculateDay = (date1: any, date2: any) => {
  const date1Format = formatFormDate(date1)
  const date2Format = formatFormDate(date2)
  if (!date1Format || !date2Format) return null
  const date1Obj = moment(moment(date1Format).format('YYYY-MM-DD'), 'YYYY-MM-DD').toDate();
  const date2Obj = moment(moment(date2Format).format('YYYY-MM-DD'), 'YYYY-MM-DD').toDate();
  const timeDiff = Math.abs(date2Obj.getTime() - date1Obj.getTime());
  const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return diffDays + 1;
};
