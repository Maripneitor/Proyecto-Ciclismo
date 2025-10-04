// src/pages/UserEventsPage.jsx
import React, { useState } from 'react';

const initialEvents = [
    { id: 1, name: 'Carrera del Bosque', date: '2025-10-10', description: 'Una carrera escénica a través del bosque.', distance: 10, type: 'Femenil' },
    { id: 2, name: 'Reto de Montaña', date: '2025-11-05', description: 'Conquista las cimas más altas.', distance: 25, type: 'Varonil' },
    { id: 3, name: 'Tour de la Ciudad', date: '2025-11-20', description: 'Recorre los puntos más icónicos.', distance: 15, type: 'Mixto' }
];

function UserEventsPage() {
  const [registeredEvents, setRegisteredEvents] = useState([2]); 

  const handleRegister = (eventId) => {
    if (registeredEvents.includes(eventId)) {
      setRegisteredEvents(registeredEvents.filter(id => id !== eventId));
      alert('Has anulado tu inscripción.');
    } else {
      setRegisteredEvents([...registeredEvents, eventId]);
      alert('¡Te has inscrito al evento!');
    }
  };

  const upcomingEvents = initialEvents.filter(event => !registeredEvents.includes(event.id));
  const myEvents = initialEvents.filter(event => registeredEvents.includes(event.id));

  return (
    <div>
      <h3 className="mb-3">Mis Eventos Inscritos</h3>
      {myEvents.length > 0 ? (
        myEvents.map(event => (
          <div className="card mb-3 shadow-sm" key={event.id}>
            <div className="card-body">
              <h5 className="card-title">{event.name}</h5>
              <p className="card-text"><small className="text-muted">{event.date} - {event.distance} KM</small></p>
              <button className="btn btn-outline-danger" onClick={() => handleRegister(event.id)}>Anular Inscripción</button>
            </div>
          </div>
        ))
      ) : (
        <div className="alert alert-info">Aún no te has inscrito a ningún evento.</div>
      )}

      <hr className="my-4" />

      <h3 className="mb-3">Próximos Eventos Disponibles</h3>
      {upcomingEvents.map(event => (
        <div className="card mb-3 shadow-sm" key={event.id}>
          <div className="card-body">
            <h5 className="card-title">{event.name}</h5>
            <p className="card-text">{event.description}</p>
            <p className="card-text"><small className="text-muted">{event.date} - {event.distance} KM - {event.type}</small></p>
            <button className="btn btn-success" onClick={() => handleRegister(event.id)}>Inscribirse</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserEventsPage;