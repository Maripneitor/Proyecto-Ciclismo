import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PublicLayout from '../layouts/PublicLayout';
import ButtonSport from '../components/ui/ButtonSport';
import { AuthContext } from '../contexts/AuthContext';
// CORRECCIÓN: Importación directa para estilos globales (SIN asignar a una variable)
import '../pages/AuthStyles.css'; // Eliminar 'styles from'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Simulación de validación de formato de email
    if (!email || !email.includes('@')) {
      setError('Por favor, introduce un email válido.');
      return;
    }

    try {
      // Intentar iniciar sesión (usando el mock de AuthContext)
      await login(email); 
      navigate('/cuenta/dashboard'); // Redirigir al dashboard
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión. Verifica tus datos.');
    }
  };

  return (
    <PublicLayout>
      <div className="auth-container">
        <div className="auth-card">
          <h2 className="auth-title">Inicia sesión</h2>
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
                required
              />
            </div>

            {/* Al hacer clic en continuar, el backend debería verificar el email
                y luego solicitar la contraseña o iniciar un flujo sin contraseña */}
            <ButtonSport type="submit" variant="primary" fullWidth>
              Continuar
            </ButtonSport>

            {error && <p className="auth-error">{error}</p>}
          </form>

          <p className="auth-link-text">
            ¿No tienes cuenta? <Link to="/registro">Regístrate</Link>
          </p>
        </div>
      </div>
    </PublicLayout>
  );
};

export default LoginPage;