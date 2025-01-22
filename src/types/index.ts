import { StackNavigationProp } from "@react-navigation/stack/lib/typescript/src/types";

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

export interface Pagination {
    limit: number;
    skip: number;
}

export type ScreenDefaultProps = {
    navigation: StackNavigationProp<any>;
};

export type QuoteProps = {
    id: number;
    author: string;
    quote: string;
};
