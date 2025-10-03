import React from 'react';

// El prop 'children' renderizará el contenido de la página específica (Estadísticas, etc.)
function OrganizerLayout({ children }) {
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Menú Lateral (Sidebar) */}
      <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{ width: '280px' }}>
        <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
          <span className="fs-4">Menú</span>
        </a>
        <hr />
        <ul className="nav nav-pills flex-column mb-auto">
          <li className="nav-item">
            <a href="#" className="nav-link active" aria-current="page">
              Panel de control
            </a>
          </li>
          <li>
            <a href="#" className="nav-link link-dark">
              Estadísticas
            </a>
          </li>
          <li>
            <a href="#" className="nav-link link-dark">
              Gestión de eventos
            </a>
          </li>
        </ul>
        <hr />
        <div className="dropdown">
          <a href="#" className="d-flex align-items-center link-dark text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <strong>Perfil</strong>
          </a>
          {/* Aquí irían las opciones del perfil */}
        </div>
      </div>

      {/* Contenido Principal de la Página */}
      <main className="w-100 p-4">
        {children}
      </main>
    </div>
  );
}

export default OrganizerLayout;