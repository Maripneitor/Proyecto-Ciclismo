// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; // <-- CORRECCIÓN: Importa el hook correcto
import { useNotification } from '../contexts/NotificationContext'; // <-- AÑADIDO: Importa el hook de notificaciones
import './AuthStyles.css';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const { addNotification } = useNotification(); // <-- AÑADIDO: Obtiene la función para notificar

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = login(email, password);

    if (user) {
      // CORRECCIÓN: Usa la notificación en lugar de alert()
      addNotification(`¡Bienvenido, ${user.name}!`, 'success');
      if (user.role === 'organizer') {
        navigate('/organizer/dashboard');
      } else {
        navigate('/user/home');
      }
    } else {
      // CORRECCIÓN: Usa la notificación para el error
      addNotification('Correo o contraseña incorrectos.', 'error');
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-sidebar">
            <div className="text-center">
              <img src="/Logo.svg" alt="Ciclomex Logo" width="120" />
              <h1 className="text-white mt-2">Ciclomex</h1>
              <p className="text-white-50">Únete a la comunidad más grande de ciclismo</p>
            </div>
          </div>
          <div className="auth-form-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Correo</label>
                <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-light text-success fw-bold">Iniciar sesión</button>
                <Link to="/register" className="btn btn-outline-light">¿No tienes cuenta? Regístrate</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;