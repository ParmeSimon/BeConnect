import { Place } from "./Place.interface";
export interface Company {
    id?: number;
    name?: string;
    siret?: string;
    jobFunction?: string;
    logo?: Blob;
    sector?: string;
    sizeCompany?: number;
    isSearch?: boolean;
    instagram?: string;
    website?: string;
    linkedin?: string;
    description?: string;
    isValidate?: boolean;
    place?: Place[];
    createdAt?: Date;
}