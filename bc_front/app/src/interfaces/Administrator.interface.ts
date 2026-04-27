import { Place } from "./Place.interface";
export interface Administrator {
    id?: number;
    logo?: Blob;
    description?: string;
    instagram?: string;
    website?: string;
    linkedin?: string;
    name?: string;
    place?:Place[]
    slogan?: string;
}