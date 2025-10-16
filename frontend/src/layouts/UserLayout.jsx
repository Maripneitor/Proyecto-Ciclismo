// src/layouts/UserLayout.jsx
import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from "../contexts/AuthContext"; // <-- CORRECCIÓN: Usa el hook desde /hooks
import './UserLayout.css';

function UserLayout() {
  const { currentUser, logout } = useAuth();

  return (
    <div className="user-layout">
      <header className="user-header">
        <NavLink to="/user/profile">
            {currentUser && <img src={`https://i.pravatar.cc/40?u=${currentUser.id}`} alt="Avatar" className="rounded-circle" />}
        </NavLink>
        <h1>Ciclomex</h1>
        <div className="d-flex align-items-center">
            <NavLink to="/user/notifications" className="me-3">
                <i className="bi bi-bell-fill fs-4 text-white"></i>
            </NavLink>
            <button onClick={logout} className="btn btn-sm btn-outline-light">Salir</button>
        </div>
      </header>
      
      <main className="user-content">
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