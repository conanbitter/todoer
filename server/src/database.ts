import Database from 'better-sqlite3'

var db = new Database('built/db.sqlite', { fileMustExist: true });

export const queryTaskListAll = db.prepare("SELECT title,isdone,created,finished FROM tasks WHERE user = ?");
export const queryTaskListState = db.prepare("SELECT title,isdone,created,finished FROM tasks WHERE user = ? AND isdone = ?");