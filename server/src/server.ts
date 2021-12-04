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

app.use(async (ctx: Context, next: Next) => {
    try {
        await next()
    } catch (err: any) {
        ctx.body = {
            "error": err.message
        };
    }
});

app.use(koaBody({ parsedMethods: ['POST'] }));
app.use(needLogin);
app.use(async (ctx: Context, next: Next) => {
    console.log(ctx.request);
    console.log(ctx.request.body);
    await next();
});

app.use(Router.post('/task/list', task.list));
app.use(Router.post('/task/new', task.create));
app.use(Router.post('/task/save', task.update));
app.use(Router.post('/task/del', task.remove));

const server = new Koa()
server.use(mount('/api', app));
server.use(mount('/static', serve(getPath('static'))));

server.use(async (ctx: Context, next: Next) => {
    await send(ctx, 'index.html', { root: rootDir });
});

server.listen(port);