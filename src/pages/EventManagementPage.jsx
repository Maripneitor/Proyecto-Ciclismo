// src/pages/EventManagementPage.jsx
import React from 'react';
import OrganizerLayout from '../layouts/OrganizerLayout';

const events = [
    { name: 'Evento 1', date: '10/10/2025', type: 'Femenil', distance: '10 KM' },
    { name: 'Evento 2', date: '10/10/2025', type: 'Varonil', distance: '10 KM' },
    { name: 'Evento 3', date: '10/10/2025', type: 'Niñes', distance: '10 KM' }
];

function EventManagementPage() {
  return (
    <OrganizerLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Gestión de Eventos</h1>
        <div>
          <button className="btn btn-success me-2"><i className="bi bi-plus-circle me-1"></i> Crear Nuevo Evento</button>
          <button className="btn btn-outline-secondary"><i className="bi bi-share me-1"></i> Compartir</button>
        </div>
      </div>

      <div className="row">
        {/* Columna del Formulario */}
        <div className="col-lg-7">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-3">Crear o Editar Evento</h5>
              <form>
                {/* ... (campos del formulario como en tu código original) ... */}
                <div className="mb-3">
                  <label className="form-label">Nombre del evento:</label>
                  <input type="text" className="form-control" />
                </div>
                {/* (Repetir para otros campos: fecha, descripción, etc.) */}
                <button type="submit" className="btn btn-primary">Guardar Evento</button>
              </form>
            </div>
          </div>
        </div>

        {/* Columna de la Lista de Eventos */}
        <div className="col-lg-5">
          <h4 className="mb-3">Lista de Eventos</h4>
          {events.map((event, index) => (
            <div className="card mb-3" key={index}>
              <div className="card-body">
                <h5 className="card-title">{event.name}</h5>
                <p className="card-text mb-1">Fecha: {event.date}</p>
                <span className={`badge bg-${event.type === 'Femenil' ? 'info' : 'primary'} me-2`}>{event.type}</span>
                <span className="badge bg-secondary">{event.distance}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </OrganizerLayout>
  );
}

export default EventManagementPage;