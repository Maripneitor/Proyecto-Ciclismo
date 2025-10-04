// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import AuthLogo from '../components/AuthLogo'; // <-- 1. Eliminamos esta línea
import './AuthStyles.css';

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'admin@test.com' && password === 'password123') {
      alert('¡Inicio de sesión de organizador exitoso!');
      navigate('/organizer/dashboard');
    } else if (email === 'user@test.com' && password === 'password123') {
        alert('¡Inicio de sesión de usuario exitoso!');
        navigate('/user/home');
    } else {
      alert('Correo o contraseña incorrectos.');
    }
  };

  return (
    <div className="auth-page">
      <div className="container">
        <div className="auth-container">
          <div className="auth-sidebar">
            {/* 2. Reemplazamos el componente AuthLogo con tu imagen */}
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
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
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