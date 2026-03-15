import User from "./User";
import { Course } from "./Course";
import { Place } from "./Place";
import { Contract } from "./Contract";

export interface Student {
    id?: number;
    logo?: string;
    nbSponsorship?: number;
    mobility?: number;
    description?: string;
    github?: string;
    user?: User;
    course?: Course;
    place?: Place;
    contract?: Contract;
}