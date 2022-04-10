import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { Stage } from '@inlet/react-pixi'

ReactDOM.render(
  <React.StrictMode>
    <Stage height={window.innerHeight} width={window.innerWidth}>
      <App />
    </Stage>
  </React.StrictMode>,
  document.getElementById('root')
)
