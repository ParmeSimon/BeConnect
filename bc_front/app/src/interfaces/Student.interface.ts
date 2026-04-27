import User from "./User.interface";
import { Course } from "./Course.interface";
import { Place } from "./Place.interface";
import { Contract } from "./Contract.interface";

export interface Student {
    id?: number;
    logo?: Blob;
    nbSponsorship?: number;
    mobility?: number;
    description?: string;
    github?: string;
    user?: User;
    course?: Course;
    place?: Place;
    contract?: Contract;
    linkedin?: string;
    website?: string;
}