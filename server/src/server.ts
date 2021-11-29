import express, { Application, Request, Response } from 'express'
import { asyncHandler } from './common.js';
const app: Application = express();
const port = 8080;

async function apiTest(req: Request, res: Response): Promise<void> {
    res.json({
        "name": "User",
        "items": [
            "one",
            "two"
        ]
    })
}

app.get('/', (req: Request, res: Response): void => {
    res.send('Hello World!');
});

app.get('/test', asyncHandler(apiTest));

app.listen(port, (): void => {
    console.log(`Example app listening at 👉 http://localhost:${port}`);
});