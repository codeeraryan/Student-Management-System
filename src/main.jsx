import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { FirebaseProvider } from './context/FirebaseProvider.jsx'
// import { TodoProvider } from './context/Todo.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
    <FirebaseProvider>
        <App className="app"/>
    </FirebaseProvider>
,
)
