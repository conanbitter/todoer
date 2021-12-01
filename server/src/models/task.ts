import express, { Application, NextFunction, Request, Response } from 'express'
import { LoginData } from '../common.js';
import * as db from "../database.js";

type TaskStatus = 'done' | 'inprogress' | 'all'

interface Task {
    title: string;
    isdone: boolean;
    created: string;
    finished: string;
}

interface listInput {
    labels?: string[];
    status: TaskStatus;
}

export function list(req: Request, res: Response) {
    const user: string = (res.locals['user'] as LoginData).userID;
    const input: listInput = req.body;
    let tasks: Task[];
    switch (input.status) {
        case 'all':
            tasks = db.queryTaskListAll.all(user);
            break;
        case 'done':
            tasks = db.queryTaskListState.all(user, 1);
            break;
        default:
            tasks = db.queryTaskListState.all(user, 0);
    }
    res.json({
        "error": "ok",
        "tasks": tasks
    })
}

interface createInput {
    text: string;
}

export function create(req: Request, res: Response) {
    res.json({
        "error": "ok"
    })
}

interface updateInput {
    id: string;
    text?: string;
    isdone?: boolean;
}

export function update(req: Request, res: Response) {
    res.json({
        "error": "ok"
    })
}

interface removeInput {
    id: string;
}

export function remove(req: Request, res: Response) {
    res.json({
        "error": "ok"
    })
}