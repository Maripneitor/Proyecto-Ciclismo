import React, { useState } from 'react';
// Paso 1: Importar el hook para la navegación
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  // Paso 2: Inicializar el hook useNavigate
  const navigate = useNavigate();

  // Paso 3: Crear estados para los campos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Paso 4: Crear la función para manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // --- Lógica de simulación de Login ---
    // En una aplicación real, aquí llamarías a tu base de datos.
    // Por ahora, usaremos datos fijos.
    const hardcodedEmail = 'admin@test.com';
    const hardcodedPassword = 'password123';

    if (email === hardcodedEmail && password === hardcodedPassword) {
      // Si el login es correcto:
      alert('¡Inicio de sesión exitoso!');
      
      // Usamos navigate para redirigir al usuario a la página principal del organizador.
      navigate('/organizer/statistics');

    } else {
      // Si el login es incorrecto:
      alert('Correo o contraseña incorrectos.');
    }
  };

  return (
    <div className="container vh-100 d-flex align-items-center justify-content-center">
      <div className="row w-100">
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center text-center p-4">
          <div className="mb-4" style={{ width: '150px', height: '150px', borderRadius: '50%', border: '2px solid black', display: 'grid', placeItems: 'center' }}>LOGO</div>
          <h2 className="mt-3">Únete a la comunidad más grande de ciclismo</h2>
        </div>

        <div className="col-md-6 p-4">
          <div className="d-flex justify-content-end mb-4">
            <button className="btn btn-primary me-2">Iniciar sesión</button>
            <button className="btn btn-outline-primary" onClick={() => navigate('/register')}>
              Registrarse
            </button>
          </div>
          
          {/* Paso 5: Conectar el formulario y los inputs a los estados y funciones */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo:</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                placeholder="Introduce tu correo"
                value={email} // Conectamos el valor al estado
                onChange={(e) => setEmail(e.target.value)} // Actualizamos el estado al escribir
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña:</label>
              <input 
                type="password" 
                className="form-control" 
                id="password" 
                placeholder="Introduce tu contraseña" 
                value={password} // Conectamos el valor al estado
                onChange={(e) => setPassword(e.target.value)} // Actualizamos el estado al escribir
                required
              />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">Iniciar sesión</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;