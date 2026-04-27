import { Student } from "./Student.interface";
import { Administrator } from "./Administrator.interface";
import { Company } from "./Company.interface";
export interface User {
    id?: number;
    email: string;
    roles: string[];
    password: string;
    fullName: string;
    failedAttemps: number;
    student?: Student;
    confirmationToken?: string;
    createdAt?: string;
    updatedAt?: string;
    administrator?: Administrator;
    company?: Company;
}

export default User;