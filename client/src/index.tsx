import React from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import 'moment/locale/ru'

import { App } from "./components/App"
import { getTaskList } from './requests'

moment.locale('ru');

ReactDOM.render(
    <App />,
    document.getElementById("appcontainer")
);