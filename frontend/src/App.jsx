import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage';
import PublicLayout from './layouts/PublicLayout';
import './styles/designTokens.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<HomePage />} />
            <Route path="login" element={<LoginPage />} />
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;