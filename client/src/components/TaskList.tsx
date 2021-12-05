import React, { ReactElement } from 'react';
import { TaskItem } from './TaskItem';
import { Task } from '../common';
import { getTaskList } from '../requests'

interface TaskListState {
    tasks: Task[];
    error: string;
    state: 'loading' | 'loaded' | 'error';
}

export class TaskList extends React.Component<{}, TaskListState> {

    constructor(props: {}) {
        super(props);
        this.state = { state: 'loading', tasks: [], error: "" };
    }

    componentDidMount(): void {
        getTaskList('all')
            .then((tasks) => { this.setState({ state: 'loaded', tasks }); })
            .catch((err: Error) => { this.setState({ state: 'error', error: err.message }); });
    }

    render() {
        let content: ReactElement | ReactElement[];
        switch (this.state.state) {
            case 'loading':
                content = <p>Loading...</p>;
                break;
            case 'error':
                content = <p>Error: {this.state.error}</p>;
                break;
            case 'loaded':
                if (this.state.tasks.length > 0) {
                    content = this.state.tasks.map(task => <TaskItem task={task} />);
                }
        }
        return (
            <div>{content}</div>
        );
    }
}