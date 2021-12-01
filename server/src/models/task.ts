import { Context } from 'koa'
import { LoginData, validated } from '../common.js';
import * as db from "../database.js";

type TaskStatus = 'completed' | 'unfinished' | 'all'

interface Task {
    title: string;
    isdone: boolean;
    created: string;
    finished: string;
}

//#region List

interface listInput {
    label?: string;
    status: TaskStatus;
}

interface listOutput {
    tasks: Task[];
}

function isListInput(val: any): val is listInput {
    console.log(val);
    return val && ("status" in val) &&
        (val.status == 'completed' || val.status == 'unfinished' || val.status == 'all') &&
        (typeof val.label == 'undefined' || typeof val.label == 'string');
}

async function listAction(input: listInput, ctx: Context): Promise<listOutput> {
    const user = (ctx.state['user'] as LoginData).userID;
    let tasks: Task[];
    switch (input.status) {
        case 'all':
            tasks = db.queryTaskListAll.all(user);
            break;
        case 'completed':
            tasks = db.queryTaskListState.all(user, 1);
            break;
        default:
            tasks = db.queryTaskListState.all(user, 0);
    }
    return {
        "tasks": tasks
    }
}

export const list = validated<listInput>(listAction, isListInput);

// #endregion

/*interface createInput {
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
}*/