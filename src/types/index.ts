export default interface User {
    username: string;
    email: string;
    token: string;
    firstName: string;
    id: number;
    refreshToken: string;
}

export interface SignInFormValues {
    email: string;
    password: string;
}

export interface SignInFormValuesDummy {
    username: string;
    password: string;
}
