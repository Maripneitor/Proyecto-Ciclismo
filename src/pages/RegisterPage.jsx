// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AuthStyles.css';

function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Las contraseñas no coinciden.");
      return;
    }
    console.log("Usuario registrado:", formData);
    alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
    navigate('/login');
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
            <h2>Registrarse</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre Completo</label>
                <input type="text" name="fullName" className="form-control" onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Correo</label>
                <input type="email" name="email" className="form-control" onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input type="password" name="password" className="form-control" onChange={handleChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Confirmar Contraseña</label>
                <input type="password" name="confirmPassword" className="form-control" onChange={handleChange} required />
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-light text-success fw-bold">Crear Cuenta</button>
                <Link to="/login" className="btn btn-outline-light">¿Ya tienes cuenta? Inicia Sesión</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;