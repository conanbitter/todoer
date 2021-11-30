import express, { Application, NextFunction, Request, Response } from 'express'
import asyncHandler from 'express-async-handler';
import { LoginData } from './common.js';
const app: Application = express();
const port = 8080;

function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    res.json({ "error": err.message });
}

function needLogin(req: Request, res: Response, next: NextFunction) {
    console.log("login");
    next();
}

function fakeLogin(req: Request, res: Response, next: NextFunction) {
    res.locals['user'] = <LoginData>{ userID: "1", userName: "alex" };
    next();
}

async function apiTest(req: Request, res: Response): Promise<void> {
    res.json({
        "name": "User",
        "items": [
            "one",
            "two"
        ]
    })
}

app.use(fakeLogin);

app.get('/', (req: Request, res: Response): void => {
    res.send(`Hello, ${(res.locals['user'] as LoginData).userName}!`);
});

app.use(needLogin);

app.get('/test', asyncHandler(apiTest));


app.use(errorHandler);

app.listen(port, (): void => {
    console.log(`Example app listening at 👉 http://localhost:${port}`);
});