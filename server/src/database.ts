import Database from 'better-sqlite3'

var db = new Database('built/db.sqlite', { fileMustExist: true });

export const queryTaskList = db.prepare("SELECT title,isdone,created,finished FROM tasks WHERE user = ?");