import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import PublicLayout from './PublicLayout'; // Para reutilizar el Header y Footer
import './UserLayout.css'; // Archivo de estilos para el layout

const navLinks = [
  { to: 'dashboard', icon: '🏠', text: 'Mi Dashboard' },
  { to: 'perfil', icon: '👤', text: 'Mis datos personales' },
  { to: 'dependientes', icon: '👨‍👩‍👧', text: 'Mis dependientes' },
  { to: 'direcciones', icon: '📍', text: 'Mis direcciones' },
  { to: 'historico', icon: '⏱️', text: 'Mi Histórico' },
  { to: 'fotos', icon: '📸', text: 'Mi Galería' },
  { to: 'beneficios-plus', icon: '⭐', text: 'Mis beneficios PLUS' },
  // ... más enlaces
];

const UserLayout = () => {
  return (
    <PublicLayout>
      <div className="user-layout-container">
        {/* Menú Lateral Izquierdo */}
        <aside className="sidebar">
          <nav>
            <ul>
              {navLinks.map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      isActive ? 'nav-link active' : 'nav-link'
                    }
                  >
                    <span className="nav-icon">{link.icon}</span>
                    {link.text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Panel de Contenido Derecho */}
        <main className="content-panel">
          <Outlet /> {/* Aquí se renderizarán las sub-vistas (DashboardPage, UserProfilePage, etc.) */}
        </main>
      </div>
    </PublicLayout>
  );
};

export default UserLayout;