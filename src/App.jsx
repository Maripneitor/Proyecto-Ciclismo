// src/App.jsx
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// Providers y Componentes Globales
import { AuthProvider } from './contexts/AuthContext';
import { EventProvider } from './contexts/EventContext';
import { NotificationProvider } from './contexts/NotificationContext';
import Notifications from './components/Notifications';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

// --- Importaciones Dinámicas (Lazy Loading) ---
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const OrganizerLayout = lazy(() => import('./layouts/OrganizerLayout'));
const UserLayout = lazy(() => import('./layouts/UserLayout'));
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const StatisticsPage = lazy(() => import('./pages/StatisticsPage'));
const EventManagementPage = lazy(() => import('./pages/EventManagementPage'));
const MonitoringPage = lazy(() => import('./pages/MonitoringPage'));
const UserHomePage = lazy(() => import('./pages/UserHomePage'));
const UserProfilePage = lazy(() => import('./pages/UserProfilePage'));
const UserEventsPage = lazy(() => import('./pages/UserEventsPage'));
const RouteDetailPage = lazy(() => import('./pages/RouteDetailPage'));
const UserNotificationsPage = lazy(() => import('./pages/UserNotificationsPage'));

// Componente de carga para mostrar mientras se descarga el código de la página
const LoadingFallback = () => (
  <div className="vh-100 d-flex justify-content-center align-items-center">
    <div className="spinner-border text-success" role="status" style={{ width: '3rem', height: '3rem' }}>
      <span className="visually-hidden">Cargando...</span>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <AuthProvider>
          <EventProvider>
            <NotificationProvider>
              
              <Notifications />
              
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  {/* --- RUTA PRINCIPAL --- */}
                  <Route path="/" element={<HomePage />} />

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
                  
                  {/* Redirección final si no coincide nada */}
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
              </Suspense>

            </NotificationProvider>
          </EventProvider>
        </AuthProvider>
      </ErrorBoundary>
    </Router>
  );
}

export default App;