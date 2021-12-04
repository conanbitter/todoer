import React from 'react'
import ReactDOM from 'react-dom'

import { App } from "./components/App"
import { getTaskList } from './requests'

getTaskList('all').then((val) => {
    console.log(val);
}).catch((reason: Error) => {
    console.log("error: " + reason.message);
})

ReactDOM.render(
    <App />,
    document.getElementById("appcontainer")
);