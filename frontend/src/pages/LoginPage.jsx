import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import apiClient from '../services/api'; // Importamos nuestro cliente de API
import './AuthStyles.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await apiClient.post('/auth/login', {
        email,
        contrasena,
      });

      const { token, usuario } = response.data;
      login(token, usuario); // Guardamos el token y los datos del usuario en el contexto
      
      // Redirigir según el rol del usuario
      if (usuario.rol === 'organizador') {
        navigate('/organizer/dashboard');
      } else {
        navigate('/user/home');
      }

    } catch (err) {
      setError(err.response?.data?.error || 'No se pudo iniciar sesión. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Iniciar Sesión</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="input-group">
          <label htmlFor="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="auth-button">Ingresar</button>
      </form>
    </div>
  );
};

export default LoginPage;