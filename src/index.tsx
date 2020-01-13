import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers'

import RoutedApp from './App'

import './index.css'

import * as serviceWorker from './serviceWorker'

const store = createStore(rootReducer)

ReactDOM.render(
    <Provider store={store}>
        <RoutedApp />
    </Provider>,
    document.getElementById('root')
)

serviceWorker.unregister()
