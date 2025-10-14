// ruta: frontend/src/contexts/AuthContext.jsx

import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Mantenemos el estado de carga para los componentes que lo necesiten

  // Cargar usuario desde localStorage al iniciar la app
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error("Error al leer el usuario de localStorage", error);
      // Si hay un error, limpiamos para evitar problemas futuros
      localStorage.removeItem('user');
    } finally {
      // Indicamos que la carga inicial ha terminado
      setLoading(false);
    }
  }, []);

  const login = (userData) => {
    const fullUserData = {
      ...userData,
      role: userData.role || 'user',
    };
    localStorage.setItem('user', JSON.stringify(fullUserData));
    setUser(fullUserData);
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    // Redirigimos de forma más suave sin recargar toda la página
    window.location.href = '/login';
  };

  const authContextValue = {
    user,
    loading,
    login,
    logout,
  };
  
  // ¡Cambio importante! Ahora siempre renderizamos los `children`.
  // Los componentes internos usarán el estado `loading` para saber si mostrar un spinner o el contenido.
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};