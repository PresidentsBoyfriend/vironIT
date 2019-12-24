import React from 'react'
import ReactDOM from 'react-dom'

import { RoutedApp } from './App'

import './index.css'

import * as serviceWorker from './serviceWorker'

ReactDOM.render(<RoutedApp />, document.getElementById('root'))

serviceWorker.unregister()
