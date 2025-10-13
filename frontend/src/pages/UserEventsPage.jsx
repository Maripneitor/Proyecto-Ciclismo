// src/pages/UserEventsPage.jsx
import React, { useState, useCallback, useMemo } from 'react';
import EventCard from '../components/EventCard';
import { useNotification } from '../contexts/NotificationContext';
import { useEvents } from '../hooks/useEvents'; // ¡Importamos el hook de eventos!

function UserEventsPage() {
  const { events } = useEvents(); // <-- Usamos los eventos del contexto
  const [registeredEvents, setRegisteredEvents] = useState([2]); // Simulación de eventos inscritos
  const { addNotification } = useNotification();

  const handleRegister = useCallback((eventId) => {
    let isRegistering = true;
    setRegisteredEvents(prevRegistered => {
      if (prevRegistered.includes(eventId)) {
        isRegistering = false;
        return prevRegistered.filter(id => id !== eventId);
      } else {
        return [...prevRegistered, eventId];
      }
    });
    
    addNotification(
      isRegistering ? '¡Te has inscrito al evento!' : 'Has anulado tu inscripción.',
      isRegistering ? 'success' : 'info'
    );
  }, [addNotification]);

  const upcomingEvents = useMemo(() => 
    events.filter(event => !registeredEvents.includes(event.id)),
    [events, registeredEvents]
  );
  
  const myEvents = useMemo(() => 
    events.filter(event => registeredEvents.includes(event.id)),
    [events, registeredEvents]
  );

  return (
    <div>
      <h3 className="mb-3">Mis Eventos Inscritos</h3>
      {myEvents.length > 0 ? (
        myEvents.map(event => (
          <EventCard 
            key={event.id}
            event={event}
            onRegister={handleRegister}
            isRegistered={true}
          />
        ))
      ) : (
        <div className="alert alert-info">Aún no te has inscrito a ningún evento.</div>
      )}

      <hr className="my-4" />

      <h3 className="mb-3">Próximos Eventos Disponibles</h3>
      {upcomingEvents.map(event => (
        <EventCard 
          key={event.id}
          event={event}
          onRegister={handleRegister}
          isRegistered={false}
        />
      ))}
    </div>
  );
}

export default UserEventsPage;
