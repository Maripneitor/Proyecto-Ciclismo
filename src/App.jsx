// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { EventProvider } from './contexts/EventContext';
import { NotificationProvider } from './contexts/NotificationContext';

import Notifications from './components/Notifications';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrganizerLayout from './layouts/OrganizerLayout';
import UserLayout from './layouts/UserLayout';
import DashboardPage from './pages/DashboardPage';
import StatisticsPage from './pages/StatisticsPage';
import EventManagementPage from './pages/EventManagementPage';
import MonitoringPage from './pages/MonitoringPage';
import UserHomePage from './pages/UserHomePage';
import UserProfilePage from './pages/UserProfilePage';
import UserEventsPage from './pages/UserEventsPage';
import RouteDetailPage from './pages/RouteDetailPage';
import UserNotificationsPage from './pages/UserNotificationsPage';
import ProtectedRoute from './components/ProtectedRoute'; // Asegúrate de que este componente exista

function App() {
  return (
    // 1. El único <Router> ahora vive aquí, envolviendo toda la aplicación.
    <Router>
      {/* 2. Todos los Contextos están DENTRO del Router,
             lo que les permite usar hooks de navegación sin errores. */}
      <AuthProvider>
        <EventProvider>
          <NotificationProvider>
            
            <Notifications /> {/* El componente de notificaciones es visible en todas las rutas */}
            
            <Routes>
              {/* Rutas Públicas */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />

              {/* Rutas Protegidas del Organizador */}
              <Route element={<ProtectedRoute allowedRoles={['organizer']} />}>
                <Route path="/organizer" element={<OrganizerLayout />}>
                  <Route index element={<Navigate to="dashboard" />} />
                  <Route path="dashboard" element={<DashboardPage />} />
                  <Route path="monitoring" element={<MonitoringPage />} />
                  <Route path="statistics" element={<StatisticsPage />} />
                  <Route path="events" element={<EventManagementPage />} />
                </Route>
              </Route>

              {/* Rutas Protegidas del Usuario */}
              <Route element={<ProtectedRoute allowedRoles={['user']} />}>
                <Route path="/user" element={<UserLayout />}>
                    <Route index element={<Navigate to="home" />} />
                    <Route path="home" element={<UserHomePage />} />
                    <Route path="profile" element={<UserProfilePage />} />
                    <Route path="events" element={<UserEventsPage />} />
                    <Route path="route-details" element={<RouteDetailPage />} />
                    <Route path="notifications" element={<UserNotificationsPage />} />
                </Route>
              </Route>
              
              {/* Ruta por defecto que redirige al login */}
              <Route path="/" element={<Navigate to="/login" />} /> 

              {/* Una ruta "catch-all" para manejar URLs no encontradas */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>

          </NotificationProvider>
        </EventProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;