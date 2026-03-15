export interface User {
    id?: number;
    email: string;
    roles?: string[];
    password: string;
    fullName: string;
    failedAttemps: number;
    website?: string;
    linkedin?: string;
}

export default User;