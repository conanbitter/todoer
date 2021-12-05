import React from 'react';
import { TaskList } from './TaskList';

interface AppState {
    name: string;
}

export class App extends React.Component<{}, AppState> {

    constructor(props: {}) {
        super(props);
        this.state = { name: "user" };

    }

    render() {
        return (
            <div>
                <TaskList />
            </div>
        );
    }
}