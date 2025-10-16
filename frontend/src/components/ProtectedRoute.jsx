import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // <-- LÍNEA CORREGIDA

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useAuth();

  // 1. Si el usuario no está autenticado, redirigirlo a la página de login.
  if (!isAuthenticated) {
    // state={{ from: location }} se usa para poder volver a la página que intentaba visitar
    // después de iniciar sesión. Es una buena práctica de UX.
    return <Navigate to="/login" replace />;
  }

  // 2. Si la ruta requiere roles específicos y el usuario no tiene el rol permitido,
  // redirigirlo a una página de "No autorizado" o a la página de inicio.
  if (allowedRoles && !allowedRoles.includes(user?.rol)) {
    return <Navigate to="/" replace />; // O a una página '/unauthorized'
  }

  // 3. Si todo está en orden, renderiza el componente hijo (ya sea un Layout o una página).
  // `children` se usa si pasas el componente directamente, `Outlet` si es una ruta anidada.
  return children ? children : <Outlet />;
};

export default ProtectedRoute;