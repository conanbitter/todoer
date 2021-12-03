import Database from 'better-sqlite3'
import { getPath } from './common.js'

var db = new Database(getPath('db.sqlite'), { fileMustExist: true });

export const queryTaskListAll = db.prepare("SELECT title,isdone,created,finished FROM tasks WHERE user = ?");
export const queryTaskListState = db.prepare("SELECT title,isdone,created,finished FROM tasks WHERE user = ? AND isdone = ?");
export const queryTaskCreate = db.prepare("INSERT INTO tasks(title,user) VALUES (?,?)");
export const queryTaskUpdateText = db.prepare("UPDATE tasks SET title = ? WHERE id = ?");
export const queryTaskUpdateState = db.prepare("UPDATE tasks SET isdone = ? WHERE id = ?");
export const queryTaskRemove = db.prepare("DELETE FROM tasks WHERE id = ?");
export const queryTaskCheck = db.prepare("SELECT count(id) as count FROM tasks WHERE id = ? AND user = ?");