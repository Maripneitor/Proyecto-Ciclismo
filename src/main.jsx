// src/main.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './Theme.css';

// Ahora, este archivo solo renderiza el componente principal 'App'.
// Toda la configuración de Router y Contextos se hará dentro de App.jsx.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
);