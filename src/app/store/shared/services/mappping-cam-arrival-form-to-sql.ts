import { FieldValue } from "@angular/fire/firestore";
import * as moment from "moment";
import { Timestamp } from "rxjs";

export function toDateSplit(str: string | null) {
    const date = str?.split('/').map((s) => s.trim()) || null
    const YYYY = date?.find((s) => s.length === 4)
    function validateDDMM(str: string | null) {
        return str?.length === 2 ? str : null
    }
    return {
        dd: validateDDMM(date?.[0] || null),
        mm: validateDDMM(date?.[1] || null),
        yyyy: YYYY || null
    }
}

export function dateSplit(dateKey: number) {
    const d = moment(dateKey, "YYYYMMDD").format('DD/MM/YYYY')
    return toDateSplit(d)
}

export function toDateKey(date: Date) {
    return Number(moment(date).format('YYYYMMDD'))
}

export function formatFormDate(date?: any | FieldValue | undefined | {
    seconds: number;
    nanoseconds: number;
}) {
    if (!date) return new Date();
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
    return new Date()
}

export function mapCamArrivalFormFireToSQL(data: any): any {

    const dobData = dateSplit(toDateKey(formatFormDate(data.dateOfBirth)))
    const passportExpiryData = dateSplit(toDateKey(formatFormDate(data.passportExpiry)))

    return {
        key: data.key ?? null,
        app_key: data.key ?? null,
        ref_id: data.key ?? null,
        data_source: "CAM_ARRIVAL_FORM_FB",
        updated_name: null,
        updated_by: data?.updated_by ?? null,
        updated_at: formatFormDate(data?.updated_at) ?? null,
        created_name: null,
        created_by: data?.created_by ?? null,
        created_at: formatFormDate(data?.created_at) ?? null,
        status: data?.status ? JSON.stringify(data?.status) : null,
        status_key: data?.status?.key ?? null,
        isDeleted: data?.isDeleted ? data?.isDeleted : false,

        accommodationHotel: data?.accommodationHotel ?? null,
        accommodationType: data?.accommodationType ? JSON.stringify(data?.accommodationType) : null,
        accommodationTypeKey: data?.accommodationType?.key ?? null,
        carrierCode: data?.carrierCode ? JSON.stringify(data?.carrierCode) : null,
        carrierName: data?.carrierName ?? null,
        committee: data?.committee ? JSON.stringify(data?.committee) : null,
        committeeKey: data?.committee?.key ?? null,
        committee_path: data?.committee_path ? JSON.stringify(data?.committee_path) : null,
        province: data?.province ? JSON.stringify(data?.province) : null,
        province_code: data?.province?.geo_id ?? null,
        province_key: data?.province?.key ?? null,
        district: data?.district ? JSON.stringify(data?.district) : null,
        district_code: data?.district?.geo_id ?? null,
        district_key: data?.district?.key ?? null,
        commune: data?.commune ? JSON.stringify(data?.commune) : null,
        commune_code: data?.commune?.geo_id ?? null,
        commune_key: data?.commune?.key ?? null,
        village: data?.village ? JSON.stringify(data?.village) : null,
        village_code: data?.village?.geo_id ?? null,
        village_key: data?.village?.key ?? null,

        confirm_at: formatFormDate(data?.confirm_at) ?? null,
        confirmed_at_key: data?.confirmed_at_key ?? null,
        confirm_by: data?.confirm_by?.key ?? null,
        confirm_name: data?.confirm_by?.displayName ?? null,

        dateArrivalKey: data?.dateArrivalKey ?? null,
        dateArrivalTimeStampKey: data?.dateArrivalTimeStampKey ?? null,
        dateCambodiaDeparture: formatFormDate(data?.dateCambodiaDeparture) ?? null,
        dateOfArrival: formatFormDate(data?.dateOfArrival) ?? null,

        flightNumber: data?.flightNumber ?? null,
        groupLeaderKey: data?.groupLeader?.key ?? null,
        groupLeader: data?.groupLeader ? JSON.stringify(data?.groupLeader) : null,
        groupName: data?.groupName ?? null,
        headerKey: data?.headerKey ?? null,
        homeNo: data?.homeNo ?? null,
        hotelName: data?.hotelName ?? null,
        isConfirmed: data?.isConfirmed ? data?.isConfirmed : false,
        isHeader: data?.isHeader ? data?.isHeader : false,


        keywords: data?.keywords ? JSON.stringify(data?.keywords) : null,
        lastCityKey: data?.lastCity?.key ?? null,
        lastCity: data?.lastCity ? JSON.stringify(data?.lastCity) : null,
        lastCityCountry: data?.lastCity?.country ? JSON.stringify(data?.lastCity?.country) : null,
        lastCityCountryCode: data?.lastCity?.country?.alpha_3_code ?? null,
        modeOfTravel: data?.modeOfTravel ?? null,
        nextCityKey: data?.nextCity?.key ?? null,
        nextCity: data?.nextCity ? JSON.stringify(data?.nextCity) : null,
        nextCityCountry: data?.nextCity?.country ? JSON.stringify(data?.nextCity?.country) : null,
        nextCityCountryCode3: data?.nextCity?.country?.alpha_3_code ?? null,
        stay_duration: data?.stay_duration ?? null,
        streetNo: data?.streetNo ?? null,
        terminal: data?.terminal ?? null,
        travelPurpose: data?.travelPurpose ?? null,

        typeKey: data?.type?.key ?? null,
        type: data?.type ? JSON.stringify(data?.type) : null,
        typeOfAirTransportKey: data?.typeOfAirTransport?.key ?? null,
        typeOfAirTransport: data?.typeOfAirTransport ? JSON.stringify(data?.typeOfAirTransport) : null,
        vehicleCompanyName: data?.vehicleCompanyName ?? null,
        vehicleTypeKey: data?.vehicleType?.key ?? null,
        vehicleType: data?.vehicleType ? JSON.stringify(data?.vehicleType) : null,
        vesselCompanyName: data?.vesselCompanyName ?? null,
        vesselTypeKey: data?.vesselType?.key ?? null,
        vesselType: data?.vesselType ? JSON.stringify(data?.vesselType) : null,


        birthCountry: data?.birthCountry ? JSON.stringify(data?.birthCountry) : null,
        birthCountryCode3: data?.birthCountry?.alpha_3_code ?? null,

        nationality: data?.nationality ? JSON.stringify(data?.nationality) : null,
        nationalityCode3: data?.nationality?.alpha_3_code ?? null,

        confirmDeclaration: data?.confirmDeclaration ? data?.confirmDeclaration : false,
        countriesIn14Days: data?.countriesIn14Days ? JSON.stringify(data?.countriesIn14Days) : null,

        dateOfBirth: formatFormDate(data?.dateOfBirth) ?? null,
        dob_key: data?.dob_key ?? null,
        dob_dd: dobData?.dd ?? null,
        dob_mm: dobData?.mm ?? null,
        dob_yyyy: dobData?.yyyy ?? null,

        email: data?.email ?? null,
        enableVOA: data?.enableVOA ? JSON.stringify(data?.enableVOA) : null,
        enableVOAKey: data?.enableVOA?.key ?? null,
        gender: data?.gender ? JSON.stringify(data?.gender) : null,
        genderKey: data?.gender?.key ?? null,
        givenName: data?.givenName ?? null,
        surname: data?.surname ?? null,

        goodDeclarations: data?.goodDeclarations ? JSON.stringify(data?.goodDeclarations) : null,
        haveGoodToDeclare: data?.haveGoodToDeclare ? JSON.stringify(data?.haveGoodToDeclare) : null,
        haveGoodToDeclareKey: data?.haveGoodToDeclare?.key ?? null,
        occupation: data?.occupation ?? null,
        overLimitMoney: data?.overLimitMoney ? JSON.stringify(data?.overLimitMoney) : null,
        overLimitMoneyKey: data?.overLimitMoney?.key ?? null,

        passport: data?.passport?.downloadUrl ?? null,
        passportExpiry: formatFormDate(data?.passportExpiry) ?? null,
        passportExpiry_dd: passportExpiryData?.dd ?? null,
        passportExpiry_mm: passportExpiryData?.mm ?? null,
        passportExpiry_yyyy: passportExpiryData?.yyyy ?? null,
        passportNumber: data?.passportNumber ?? null,

        phoneCountryCode: data?.phoneCountryCode ? JSON.stringify(data?.phoneCountryCode) : null,
        phoneNumber: data?.phoneNumber ?? null,
        photo: data?.photo?.downloadUrl ?? null,

        profile_key: data?.profile_key ?? null,
        profile_type: data?.profile_type ? JSON.stringify(data?.profile_type) : null,
        profile_typeKey: data?.profile_type?.key ?? null,

        selectedSymptomKeys: data?.selectedSymptomKeys ? JSON.stringify(data?.selectedSymptomKeys) : null,
        selectedSymptoms: data?.selectedSymptoms ? JSON.stringify(data?.selectedSymptoms) : null,
        socialOption: data?.socialOption ? JSON.stringify(data?.socialOption) : null,
        socialOptionKey: data?.socialOption?.key ?? null,
        socialText: data?.socialText ?? null,

        visaType: data?.visaType ? JSON.stringify(data?.visaType) : null,
        visaTypeKey: data?.visaType?.key ?? null,

    }
}
