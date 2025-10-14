// ruta: frontend/src/App.jsx

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import UserLayout from './layouts/UserLayout';
import OrganizerLayout from './layouts/OrganizerLayout';

// Public Pages
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import CategoryPage from './pages/CategoryPage';
import RouteDetailPage from './pages/RouteDetailPage';
import DesignSystemShowcase from './pages/DesignSystemShowcase';

// User Pages
import UserHomePage from './pages/UserHomePage';
import UserEventsPage from './pages/UserEventsPage';
import UserProfilePage from './pages/UserProfilePage';
import UserNotificationsPage from './pages/UserNotificationsPage';

// Organizer Pages
import DashboardPage from './pages/DashboardPage';
import EventManagementPage from './pages/EventManagementPage';
import StatisticsPage from './pages/StatisticsPage';
import MonitoringPage from './pages/MonitoringPage';

// Other Components
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas Públicas */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
            <Route path="category/:categoryName" element={<CategoryPage />} />
            <Route path="event/:eventId" element={<RouteDetailPage />} />
            <Route path="design-system" element={<DesignSystemShowcase />} />
          </Route>

          {/* Rutas Protegidas para Usuarios */}
          <Route
            path="/user"
            element={
              <ProtectedRoute allowedRoles={['user', 'organizer']}>
                <UserLayout />
              </ProtectedRoute>
            }
          >
            <Route path="home" element={<UserHomePage />} />
            <Route path="events" element={<UserEventsPage />} />
            <Route path="profile" element={<UserProfilePage />} />
            <Route path="notifications" element={<UserNotificationsPage />} />
          </Route>

          {/* Rutas Protegidas para Organizadores */}
          <Route
            path="/organizer"
            element={
              <ProtectedRoute allowedRoles={['organizer']}>
                <OrganizerLayout />
              </ProtectedRoute>
            }
          >
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="events" element={<EventManagementPage />} />
            <Route path="statistics" element={<StatisticsPage />} />
            <Route path="monitoring" element={<MonitoringPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;