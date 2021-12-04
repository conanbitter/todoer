import React from 'react';

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
                <h1>Hello, {this.state.name}!</h1>
            </div>
        );
    }
}