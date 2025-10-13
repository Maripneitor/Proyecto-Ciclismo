// src/pages/MonitoringPage.jsx
import React, { useState, useMemo } from 'react';
import { useEvents } from '../hooks/useEvents.js'; // 1. Corregimos la importación

// Datos de ejemplo para las alertas y estadísticas de cada evento
const monitoringData = {
  1: { active: '65/70', finished: '5', alerts: 2, alertList: [{ time: '13:05', text: 'Alerta de Juan Pérez' }, { time: '13:15', text: 'Alerta de Ana Gómez' }] },
  2: { active: '40/50', finished: '10', alerts: 0, alertList: [] },
  3: { active: '80/100', finished: '0', alerts: 1, alertList: [{ time: '09:30', text: 'Alerta de Luis Martínez' }] },
};

// Componente presentacional para la lista de alertas (Memoizado)
const AlertList = React.memo(({ alerts }) => (
  <div className="card-body" style={{ maxHeight: '300px', overflowY: 'auto' }}>
    {alerts.length > 0 ? (
      alerts.map((alert, index) => (
        <div key={index} className="alert alert-warning p-2 mb-2 d-flex justify-content-between align-items-center">
          <span><strong>{alert.time}:</strong> {alert.text}</span>
          <button className="btn btn-sm btn-outline-dark">Ver</button>
        </div>
      ))
    ) : (
      <p className="text-muted text-center mt-2">No hay alertas.</p>
    )}
  </div>
));
AlertList.displayName = 'AlertList';

function MonitoringPage() {
  const { events } = useEvents();

  // 2. Lógica más segura para seleccionar el primer evento
  const defaultEventId = useMemo(() => (events.length > 0 ? events[0].id : null), [events]);
  const [selectedEventId, setSelectedEventId] = useState(defaultEventId);

  // Si no hay eventos, no se intenta buscar
  const selectedEvent = useMemo(() => events.find(e => e.id === selectedEventId), [events, selectedEventId]);

  const eventData = selectedEventId ? monitoringData[selectedEventId] : { active: 'N/A', finished: 'N/A', alerts: 0, alertList: [] };

  if (events.length === 0) {
    return (
        <div className="alert alert-info">
            <h4 className="alert-heading">No hay eventos disponibles</h4>
            <p>No hay eventos para monitorear en este momento. Por favor, crea un evento en la página de Gestión de Eventos.</p>
        </div>
    );
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Monitoreo en Tiempo Real</h1>
      </div>

      <div className="row">
        {/* Columna principal del mapa */}
        <div className="col-lg-9">
          <div className="card h-100">
            <div className="card-header fw-bold">{selectedEvent ? `Mapa de: ${selectedEvent.name}` : 'Seleccione un evento'}</div>
            <div className="card-body text-center d-flex align-items-center justify-content-center">
              <img src="https://i.imgur.com/3Z0aJp8.png" alt="Mapa de la ruta" className="img-fluid rounded" />
            </div>
          </div>
        </div>

        {/* Columna lateral de estadísticas y alertas */}
        <div className="col-lg-3">
          <div className="card mb-3">
            <div className="card-header fw-bold">Estadísticas Rápidas</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Activos: <strong>{eventData.active}</strong></li>
              <li className="list-group-item">Finalizados: <strong>{eventData.finished}</strong></li>
              <li className="list-group-item">Alertas: <strong className="text-danger">{eventData.alerts}</strong></li>
            </ul>
          </div>
          <div className="card">
            <div className="card-header fw-bold">Alertas Recientes</div>
            <AlertList alerts={eventData.alertList} />
          </div>
        </div>
      </div>
      
      {/* Barra inferior para seleccionar evento */}
      <div className="card mt-4">
        <div className="card-header">Seleccionar Evento para Monitoreo</div>
        <div className="card-body d-flex justify-content-center flex-wrap gap-2">
          {events.map(event => (
            <button 
              key={event.id}
              className={`btn ${selectedEventId === event.id ? 'btn-success' : 'btn-outline-success'}`}
              onClick={() => setSelectedEventId(event.id)}
            >
              {event.name}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

export default MonitoringPage;