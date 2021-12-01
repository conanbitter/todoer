import Koa, { Context, Next } from 'koa'
import koaBody from 'koa-body';
import Router from 'koa-route';
import { LoginData } from './common.js';
import * as task from './models/task.js';

const app = new Koa();
const port = 8080;

async function needLogin(ctx: Context, next: Next) {
    ctx.state['user'] = <LoginData>{ userID: "1", userName: "alex" };
    await next();
}

async function apiTest(ctx: Context) {
    ctx.body = {
        "name": "User",
        "items": [
            "one",
            "two"
        ]
    }
}

app.use(async (ctx: Context, next: Next) => {
    try {
        await next()
    } catch (err: any) {
        ctx.body = {
            "error": err.message
        };
    }
});

app.use(koaBody({ parsedMethods: ['GET'] }));
app.use(needLogin);
app.use(Router.get('/', (ctx: Context) => {
    ctx.body = `Hello, ${(ctx.state['user'] as LoginData).userName}!`;
}));


app.use(Router.get('/task/list', task.list));
app.use(Router.get('/task/new', task.create));
app.use(Router.get('/task/save', task.update));
app.use(Router.get('/task/del', task.remove));

app.use(Router.get('/test', apiTest));

app.listen(port);