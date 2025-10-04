// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrganizerLayout from './layouts/OrganizerLayout';
import UserLayout from './layouts/UserLayout';
import DashboardPage from './pages/DashboardPage';
import StatisticsPage from './pages/StatisticsPage';
import EventManagementPage from './pages/EventManagementPage';
import UserHomePage from './pages/UserHomePage';
import UserProfilePage from './pages/UserProfilePage';
import UserEventsPage from './pages/UserEventsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/organizer" element={<OrganizerLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="statistics" element={<StatisticsPage />} />
          <Route path="events" element={<EventManagementPage />} />
        </Route>

        <Route path="/user" element={<UserLayout />}>
            <Route index element={<Navigate to="home" />} />
            <Route path="home" element={<UserHomePage />} />
            <Route path="profile" element={<UserProfilePage />} />
            <Route path="events" element={<UserEventsPage />} />
        </Route>
        
        <Route path="/" element={<Navigate to="/login" />} /> 
      </Routes>
    </Router>
  );
}

export default App;