// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

// Layouts
import OrganizerLayout from './layouts/OrganizerLayout';
import UserLayout from './layouts/UserLayout';

// Páginas de Organizador
import DashboardPage from './pages/DashboardPage';
import StatisticsPage from './pages/StatisticsPage';
import EventManagementPage from './pages/EventManagementPage';

// Páginas de Usuario
import UserHomePage from './pages/UserHomePage';
import UserProfilePage from './pages/UserProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas de Autenticación */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rutas del Panel de Organizador (Protegidas por el layout) */}
        <Route path="/organizer" element={<OrganizerLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="statistics" element={<StatisticsPage />} />
          <Route path="events" element={<EventManagementPage />} />
        </Route>

        {/* Rutas del Panel de Usuario (Protegidas por el layout) */}
        <Route path="/user" element={<UserLayout />}>
            <Route path="home" element={<UserHomePage />} />
            <Route path="profile" element={<UserProfilePage />} />
            {/* <Route path="events" element={<UserEventsPage />} /> Puedes agregar más aquí */}
        </Route>
        
        {/* Ruta por defecto, redirige a Login */}
        <Route path="/" element={<Navigate to="/login" />} /> 
      </Routes>
    </Router>
  );
}

export default App;