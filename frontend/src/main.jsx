import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { NotificationProvider } from './contexts/NotificationContext'; // <-- 1. IMPORTA EL PROVIDER

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NotificationProvider> {/* <-- 2. ENVUELVE TU APP */}
      <App />
    </NotificationProvider>
  </React.StrictMode>,
)