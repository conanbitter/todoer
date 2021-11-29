import { Request, Response } from 'express'

export function asyncHandler(fn: (req: Request, res: Response) => Promise<void>): (req: Request, res: Response) => void {
    return (req: Request, res: Response): void => {
        fn(req, res).catch((err: Error) => {
            console.log(err);
            res.json({ "error": err.message });
        });
    }
}