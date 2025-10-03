import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StatisticsPage from './pages/StatisticsPage';
import EventManagementPage from './pages/EventManagementPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas de Autenticación */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Rutas del Panel de Organizador */}
        <Route path="/organizer/statistics" element={<StatisticsPage />} />
        <Route path="/organizer/events" element={<EventManagementPage />} />

        {/* Puedes agregar una ruta por defecto */}
        <Route path="/" element={<LoginPage />} /> 
      </Routes>
    </Router>
  );
}

export default App;