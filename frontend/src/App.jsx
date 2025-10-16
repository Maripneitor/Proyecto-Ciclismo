import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import PublicLayout from "./layouts/PublicLayout";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import UserHomePage from "./pages/UserHomePage";
import OrganizerLayout from "./layouts/OrganizerLayout";
import DashboardPage from "./pages/DashboardPage";
import UserProfilePage from "./pages/UserProfilePage";
import UserLayout from "./layouts/UserLayout";

function App() {
  return (
    <AuthProvider>
      {/* Hemos eliminado la propiedad 'basename' del Router */}
      <Router>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="profile" element={<UserProfilePage />} />
          </Route>

          {/* Rutas Protegidas para Usuarios */}
          <Route
            path="/user"
            element={
              <ProtectedRoute allowedRoles={['usuario', 'organizador', 'admin']}>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route path="home" element={<UserHomePage />} />
            {/* Otras rutas de usuario aquí */}
          </Route>

          {/* Rutas Protegidas para Organizadores */}
          <Route
            path="/organizer"
            element={
              <ProtectedRoute allowedRoles={['organizador', 'admin']}>
                <OrganizerLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<DashboardPage />} />
            {/* Otras rutas de organizador aquí */}
          </Route>

          {/* Puedes añadir una ruta para 'página no encontrada' */}
          <Route path="*" element={<h1>404: Página no encontrada</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;