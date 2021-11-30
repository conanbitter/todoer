import express, { Application, NextFunction, Request, Response } from 'express'
import { LoginData } from '../common.js';
import { queryTaskList } from "../database.js";

type TaskStatus = 'done' | 'inprogress' | 'all'

interface Task {
    title: string;
    isdone: boolean;
    created: string;
    finished: string;
}

export function list(req: Request, res: Response) {
    const user: string = (res.locals['user'] as LoginData).userID;
    const tasks: Task[] = queryTaskList.all(user);
    res.json({
        "error": "ok",
        "tasks": tasks
    })
}

export function create(req: Request, res: Response) {
    res.json({
        "error": "ok"
    })
}

export function update(req: Request, res: Response) {
    res.json({
        "error": "ok"
    })
}

export function remove(req: Request, res: Response) {
    res.json({
        "error": "ok"
    })
}