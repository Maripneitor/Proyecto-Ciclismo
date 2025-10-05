// src/layouts/OrganizerLayout.jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './OrganizerLayout.css';

function OrganizerLayout() {
  const { currentUser, logout } = useAuth();
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: '280px' }}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <i className="bi bi-gear-wide-connected me-2 fs-4"></i>
          <span className="fs-4">Organizador</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li><NavLink to="/organizer/dashboard" className="nav-link text-white"><i className="bi bi-speedometer2 me-2"></i> Panel de control</NavLink></li>
          <li><NavLink to="/organizer/monitoring" className="nav-link text-white"><i className="bi bi-map me-2"></i> Monitoreo</NavLink></li>
          <li><NavLink to="/organizer/events" className="nav-link text-white"><i className="bi bi-calendar-event me-2"></i> Gestión de eventos</NavLink></li>
          <li><NavLink to="/organizer/statistics" className="nav-link text-white"><i className="bi bi-graph-up me-2"></i> Estadísticas</NavLink></li>
        </ul>
        <hr />
        <div className="dropdown">
          <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src={`https://i.pravatar.cc/40?u=${currentUser?.id}`} alt="avatar" width="32" height="32" className="rounded-circle me-2"/>
            <strong>{currentUser?.name || 'Organizador'}</strong>
          </a>
          <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
            <li><button className="dropdown-item" onClick={logout}>Cerrar sesión</button></li>
          </ul>
        </div>
      </div>
      <main className="w-100 p-4 bg-light"><Outlet /></main>
    </div>
  );
}
export default OrganizerLayout;