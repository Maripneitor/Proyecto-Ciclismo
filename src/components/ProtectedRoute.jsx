// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ allowedRoles }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        // Si no hay usuario, redirige al login
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
        // Si el rol del usuario no está permitido, redirige al inicio
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;