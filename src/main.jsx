import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './Theme.css'; // <-- Agrega esta línea

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);