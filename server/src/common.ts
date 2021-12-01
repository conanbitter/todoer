export interface LoginData {
    userID: string;
    userName: string;
}

type TypeGuardian<Type> = (val: unknown) => val is Type;