import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './viewes/App'
import './viewes/styles/common.scss'
import './viewes/styles/reset.scss'

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>, 
)
