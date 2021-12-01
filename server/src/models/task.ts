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

function checkTaskOwner(taskID: string, userID: string): boolean {
    let result: number = db.queryTaskCheck.get(taskID, userID).count;
    return result == 1;
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

//#region Create

interface createInput {
    text: string;
}

interface createOutput {
    id: string;
}

function isCreateInput(val: any): val is createInput {
    return val && (typeof val.text == 'string');
}

async function createAction(input: createInput, ctx: Context): Promise<createOutput> {
    const user = (ctx.state['user'] as LoginData).userID;
    return { id: "1" };
}

export const create = validated<createInput>(createAction, isCreateInput);

//#endregion

//#region Update

interface updateTextInput {
    id: string;
    text: string;
}

interface updateStatusInput {
    id: string;
    state: string;
}

type updateInput = updateTextInput | updateStatusInput;

function isUpdateInput(val: any): val is updateInput {
    return val &&
        (typeof val.id == 'string') &&
        (
            ((typeof val.text == 'string') && (typeof val.state == 'undefined')) ||
            ((typeof val.text == 'undefined') && (typeof val.state == 'string'))
        )
}

async function updateAction(input: updateInput, ctx: Context): Promise<{}> {
    const user = (ctx.state['user'] as LoginData).userID;
    if (!checkTaskOwner(input.id, user)) {
        throw new Error('task_not_found');
    }
    return {}
}

export const update = validated<updateInput>(updateAction, isUpdateInput);

//#endregion

//#region Remove

interface removeInput {
    id: string;
}

function isRemoveInput(val: any): val is removeInput {
    return val &&
        (typeof val.id == 'string');
}

async function removeAction(input: removeInput, ctx: Context): Promise<{}> {
    const user = (ctx.state['user'] as LoginData).userID;
    if (!checkTaskOwner(input.id, user)) {
        throw new Error('task_not_found');
    }
    return {}
}

export const remove = validated<removeInput>(removeAction, isRemoveInput);

//#endregion