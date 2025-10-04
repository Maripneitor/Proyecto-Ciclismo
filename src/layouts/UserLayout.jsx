// src/layouts/UserLayout.jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom'; // Ya estaba importado, solo lo usamos
import './UserLayout.css';

function UserLayout() {
  return (
    <div className="user-layout">
      <header className="user-header">
        <h1>Ciclomex</h1>
        <NavLink to="/user/profile">
            <i className="bi bi-person-circle fs-3"></i>
        </NavLink>
      </header>
      
      <main className="user-content">
        {/* Usamos Outlet en lugar del contenido directo */}
        <Outlet />
      </main>

      <nav className="user-bottom-nav">
        <NavLink to="/user/home" className="nav-item">
          <i className="bi bi-house-door-fill"></i>
          <span>Inicio</span>
        </NavLink>
        <NavLink to="/user/events" className="nav-item">
          <i className="bi bi-calendar-event-fill"></i>
          <span>Eventos</span>
        </NavLink>
        <NavLink to="/user/profile" className="nav-item">
          <i className="bi bi-person-fill"></i>
          <span>Perfil</span>
        </NavLink>
      </nav>
    </div>
  );
}

export default UserLayout;