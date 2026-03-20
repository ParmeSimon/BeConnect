import { Student } from "./Student";

export interface User {
    id?: number;
    email: string;
    roles?: string[];
    password: string;
    fullName: string;
    failedAttemps: number;
    website?: string;
    linkedin?: string;
    student?: Student;
    confirmationToken?: string;
    createdAt?: string;
    updatedAt?: string;
}

export default User;