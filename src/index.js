import React from 'react'
import ReactDOM from 'react-dom'
import { worker } from './mocks/browser'
import './index.css'
import GenresProvider from './context/GenresProvider'
import App from './app/App'
import reportWebVitals from './reportWebVitals'

worker.start().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <GenresProvider>
        <App />
      </GenresProvider>
    </React.StrictMode>,
    document.getElementById('root'),
  )
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
