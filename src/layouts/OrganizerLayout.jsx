// src/layouts/OrganizerLayout.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

function OrganizerLayout({ children }) {
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark" style={{ width: '280px' }}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
          <i className="bi bi-gear-wide-connected me-2 fs-4"></i>
          <span className="fs-4">Organizador</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li>
            <NavLink to="/organizer/dashboard" className="nav-link text-white">
              <i className="bi bi-speedometer2 me-2"></i> Panel de control
            </NavLink>
          </li>
          <li>
            <NavLink to="/organizer/events" className="nav-link text-white">
              <i className="bi bi-calendar-event me-2"></i> Gestión de eventos
            </NavLink>
          </li>
          <li>
            <NavLink to="/organizer/statistics" className="nav-link text-white">
              <i className="bi bi-graph-up me-2"></i> Estadísticas
            </NavLink>
          </li>
        </ul>
        <hr />
        {/* ... (resto del layout) ... */}
      </div>
      <main className="w-100 p-4">
        {children}
      </main>
    </div>
  );
}

export default OrganizerLayout;