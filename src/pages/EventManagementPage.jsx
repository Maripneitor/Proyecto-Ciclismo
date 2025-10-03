import React from 'react';
import OrganizerLayout from '../layouts/OrganizerLayout';

// Datos de ejemplo para la lista de eventos
const events = [
    { name: 'Evento 1', date: '10/10/2025', type: 'Femenil', distance: '10 KM' },
    { name: 'Evento 2', date: '10/10/2025', type: 'Varonil', distance: '10 KM' },
    { name: 'Evento 3', date: '10/10/2025', type: 'Niñes', distance: '10 KM' }
];

function EventManagementPage() {
  return (
    <OrganizerLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Gestión de eventos</h1>
        <button className="btn btn-outline-secondary">Compartir</button>
      </div>

      <div className="row">
        {/* Columna del Formulario */}
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
                <div className="mb-3">
                    <button className="btn btn-success me-2">Crear nuevo evento</button>
                    <button className="btn btn-warning">Editar evento</button>
                </div>
                <form>
                    <div className="mb-3">
                        <label className="form-label">Nombre del evento:</label>
                        <input type="text" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Fecha del evento:</label>
                        <input type="date" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Descripción del evento:</label>
                        <textarea className="form-control" rows="3"></textarea>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Distancia del recorrido (KM):</label>
                        <input type="number" className="form-control" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Tipo de categoría:</label>
                        <select className="form-select">
                            <option>Femenil</option>
                            <option>Varonil</option>
                            <option>Niñes</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Crear</button>
                </form>
            </div>
          </div>
        </div>

        {/* Columna de la Lista de Eventos */}
        <div className="col-md-6">
            <h4 className="mb-3">Lista de eventos</h4>
            {events.map((event, index) => (
                <div className="card mb-3" key={index}>
                    <div className="card-body">
                        <h5 className="card-title">{event.name}</h5>
                        <p className="card-text">Fecha: {event.date}</p>
                        <p className="card-text">Tipo: {event.type} - Distancia: {event.distance}</p>
                    </div>
                </div>
            ))}
        </div>
      </div>
    </OrganizerLayout>
  );
}

export default EventManagementPage;