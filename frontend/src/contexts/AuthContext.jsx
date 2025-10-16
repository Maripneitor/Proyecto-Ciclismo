import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../services/api';
import { jwtDecode } from 'jwt-decode'; // <-- 1. CAMBIO AQUÍ: Importación nombrada

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const initializeAuth = () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const decoded = jwtDecode(token); // <-- 2. CAMBIO AQUÍ: Se usa el nuevo nombre
                    // Comprueba si el token ha expirado
                    if (decoded.exp * 1000 > Date.now()) {
                        setCurrentUser({
                            id: decoded.id,
                            email: decoded.email,
                            role: decoded.role,
                        });
                    } else {
                        // Token expirado
                        localStorage.removeItem('token');
                    }
                } catch (error) {
                    console.error("Token inválido:", error);
                    localStorage.removeItem('token');
                }
            }
            setLoading(false);
        };
        initializeAuth();
    }, []);

    const login = async (email, password) => {
        try {
            const response = await apiClient.post('/auth/login', { email, password });
            const { token } = response.data;
            localStorage.setItem('token', token);
            const decoded = jwtDecode(token); // <-- 3. CAMBIO AQUÍ: Se usa el nuevo nombre
            setCurrentUser({
                id: decoded.id,
                email: decoded.email,
                role: decoded.role,
            });
            // Redirige según el rol
            if (decoded.role === 'organizador' || decoded.role === 'admin') {
                navigate('/organizer/dashboard');
            } else {
                navigate('/user/home');
            }
        } catch (error) {
            console.error('Error en el login:', error);
            throw error;
        }
    };

    const register = async (email, password, name) => {
        try {
            // Asumimos que el backend espera 'name', 'email', 'password'
            const response = await apiClient.post('/auth/register', { name, email, password });
            return response.data;
        } catch (error) {
            console.error('Error en el registro:', error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setCurrentUser(null);
        navigate('/login');
    };

    const value = {
        currentUser,
        loading,
        login,
        register,
        logout,
    };

    // No renderizar la app hasta que se haya verificado el token
    if (loading) {
        return <div>Cargando aplicación...</div>;
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};