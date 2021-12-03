import Koa, { Context, Next } from 'koa'
import koaBody from 'koa-body';
import Router from 'koa-route';
import serve from 'koa-static';
import send from 'koa-send';
import mount from 'koa-mount';
import { LoginData, rootDir, getPath } from './common.js';
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

const server = new Koa()
server.use(mount('/api', app));
server.use(mount('/static', serve(getPath('static'))));

server.use(async (ctx: Context, next: Next) => {
    await send(ctx, 'index.html', { root: rootDir });
});

server.listen(port);