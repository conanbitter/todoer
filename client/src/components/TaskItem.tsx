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

    setEditMode = () => {
        this.setState({ mode: 'edit' });
    }

    exitEditMode = () => {
        this.setState({ mode: 'show' });
    }

    render() {
        if (this.state.mode == 'show') {
            return (
                <div>
                    <h3>{this.props.task.title}</h3>
                    <p>
                        Создано: {moment(this.props.task.created).format('LLL')}
                        <button onClick={this.setEditMode}>Редактировать</button>
                    </p>
                    <hr />
                </div>
            );
        } else {
            return (
                <div>
                    <input type="text" value={this.props.task.title} />
                    <p>
                        <button onClick={this.exitEditMode}>Отменить</button>
                    </p>
                    <hr />
                </div>
            );
        }
    }
}