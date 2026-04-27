import { Administrator } from "./Administrator.interface";
import { Contract } from "./Contract.enum";
import { Place } from "./Place.interface";
import { Company } from "./Company.interface";
export interface Offer {
    id: number;
    title: string;
    domain: string;
    level: number;
    description: string;
    mission: string;
    startDate: Date;
    endDate: Date;
    duration: number;
    salary: number;
    compensation: number;
    rythm: string;
    isTeleWorking: boolean;
    workingTime: number;
    isClosed: boolean;
    contract: Contract;
    place:Place[];
    company:Company;
    administrator: Administrator;
    isValidate:boolean;
    createdAt: Date;
}
    