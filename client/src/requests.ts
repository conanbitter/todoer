import axios from 'axios'
import { Task, ApiResponse } from './common'

interface TaskResponse extends ApiResponse {
    tasks: Task[];
}

export async function getTaskList(state: string, label?: string): Promise<Task[]> {
    let request: any = { state };
    if (label) {
        request.label = label;
    }
    let response = await axios.post<TaskResponse>('/api/task/list', request);
    if (response.status != 200) {
        throw new Error(response.statusText);
    }
    if (response.data.error != 'ok') {
        throw new Error(response.data.error);
    }
    return response.data.tasks;
}