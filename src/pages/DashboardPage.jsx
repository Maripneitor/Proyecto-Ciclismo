// src/pages/DashboardPage.jsx
import React from 'react';
import OrganizerLayout from '../layouts/OrganizerLayout';

const StatCard = ({ title, value, icon, color }) => (
  <div className="col-md-4">
    <div className={`card text-white bg-${color} mb-3 shadow-sm`}>
      <div className="card-body d-flex justify-content-between align-items-center">
        <div>
          <h5 className="card-title">{title}</h5>
          <p className="card-text fs-3">{value}</p>
        </div>
        <i className={`bi ${icon} fs-1 opacity-50`}></i>
      </div>
    </div>
  </div>
);

function DashboardPage() {
  return (
    <OrganizerLayout>
      <h1 className="h3 mb-4">Panel de Control</h1>
      <div className="row">
        <StatCard title="Competidores Activos" value="56/70" icon="bi-bicycle" color="success" />
        <StatCard title="Eventos Finalizados" value="9" icon="bi-flag-fill" color="primary" />
        <StatCard title="Alertas Recientes" value="1" icon="bi-exclamation-triangle-fill" color="danger" />
      </div>
      
      <div className="card mt-4">
        <div className="card-header">
            Próximo Evento: Carrera de Montaña
        </div>
        <div className="card-body">
            <p>Fecha: 25 de Octubre, 2025</p>
            <p>Ubicación: Cañón del Sumidero</p>
            <button className="btn btn-outline-success">Ver detalles del evento</button>
        </div>
      </div>
    </OrganizerLayout>
  );
}

export default DashboardPage;