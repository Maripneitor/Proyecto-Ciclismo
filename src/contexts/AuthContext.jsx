// src/contexts/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    // 1. Al iniciar, intenta leer el usuario desde el localStorage.
    const [currentUser, setCurrentUser] = useState(() => {
        try {
            const user = localStorage.getItem('currentUser');
            return user ? JSON.parse(user) : null;
        } catch (error) {
            console.error("Error al leer localStorage", error);
            return null;
        }
    });
    
    const navigate = useNavigate();

    // 2. Cada vez que el usuario cambie (login/logout/update), lo guarda en localStorage.
    useEffect(() => {
        if (currentUser) {
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
        } else {
            localStorage.removeItem('currentUser');
        }
    }, [currentUser]);

    // Simulación de una base de datos de usuarios
    const users = [
        { id: 1, email: 'user@test.com', password: 'password123', name: 'Juan Ciclista', role: 'user' },
        { id: 2, email: 'admin@test.com', password: 'password123', name: 'Mario Organizador', role: 'organizer' }
    ];

    const login = (email, password) => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user) {
            setCurrentUser(user);
            return user;
        }
        return null;
    };

    const logout = () => {
        setCurrentUser(null); // Esto dispara el useEffect para limpiar localStorage
        navigate('/login');
    };

    const updateUser = (updatedData) => {
        if (currentUser) {
            setCurrentUser(prevUser => ({ ...prevUser, ...updatedData }));
        }
    };

    const value = {
        currentUser,
        login,
        logout,
        updateUser
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};