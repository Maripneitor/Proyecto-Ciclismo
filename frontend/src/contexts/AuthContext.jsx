import React, { createContext, useState, useContext } from 'react';

// 1. Creamos el contexto
const AuthContext = createContext();

// 2. Creamos el componente Proveedor que envolverá nuestra app
export const AuthProvider = ({ children }) => {
  // Inicializamos el estado leyendo del localStorage para mantener la sesión
  const [auth, setAuth] = useState({
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    isAuthenticated: !!localStorage.getItem('token'),
  });

  const login = (token, user) => {
    // Al iniciar sesión, guardamos los datos en localStorage y actualizamos el estado
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    setAuth({
      token,
      user,
      isAuthenticated: true,
    });
  };

  const logout = () => {
    // Al cerrar sesión, limpiamos localStorage y el estado
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setAuth({
      token: null,
      user: null,
      isAuthenticated: false,
    });
  };

  // El valor que será accesible por todos los componentes hijos
  const value = { ...auth, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Creamos el hook personalizado para consumir el contexto fácilmente
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};