import React from 'react';
import { Task } from '../common';
import moment from 'moment';

interface TaskItemProps {
    task: Task;
}

interface TaskItemState {
    mode: 'show' | 'edit';
}

export class TaskItem extends React.Component<TaskItemProps, TaskItemState> {

    constructor(props: TaskItemProps) {
        super(props);
        this.state = { mode: 'show' };
    }

    render() {
        return (
            <div>
                <h1>{this.props.task.title}</h1>
                <p>Создано: {moment(this.props.task.created).format('LLL')}</p>
            </div>
        );
    }
}