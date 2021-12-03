import { Context } from 'koa'
import path from 'path'
import { fileURLToPath } from 'url'

export interface LoginData {
    userID: string;
    userName: string;
}

type TypeGuardian<Type> = (val: any) => val is Type;

export function validated<Type>(fn: (input: Type, ctx: Context) => Promise<any>, guardian: TypeGuardian<Type>) {
    return async (ctx: Context) => {
        if (guardian(ctx.request.body)) {
            let result = await fn(ctx.request.body, ctx);
            result.error = "ok";
            ctx.body = result;
        } else {
            throw new Error('invalid_input');
        }
    }
}

export const rootDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');

export function getPath(pathname: string): string {
    return path.join(rootDir, pathname);
}