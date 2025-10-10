// src/pages/UserEventsPage.jsx
import React, { useState, useCallback, useMemo } from 'react';
import EventCard from '../components/EventCard'; // Importamos el componente optimizado
import { useNotification } from '../contexts/NotificationContext'; // Para notificaciones

const initialEvents = [
    { id: 1, name: 'Carrera del Bosque', date: '2025-10-10', description: 'Una carrera escénica a través del bosque.', distance: 10, type: 'Femenil' },
    { id: 2, name: 'Reto de Montaña', date: '2025-11-05', description: 'Conquista las cimas más altas.', distance: 25, type: 'Varonil' },
    { id: 3, name: 'Tour de la Ciudad', date: '2025-11-20', description: 'Recorre los puntos más icónicos.', distance: 15, type: 'Mixto' }
];

function UserEventsPage() {
  const [registeredEvents, setRegisteredEvents] = useState([2]); 
  const { addNotification } = useNotification();

  // useCallback evita que la función se recree en cada render, optimizando los componentes hijos.
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
    
    if (isRegistering) {
      addNotification('¡Te has inscrito al evento!', 'success');
    } else {
      addNotification('Has anulado tu inscripción.', 'info');
    }
  }, [addNotification]);

  // useMemo optimiza el cálculo de las listas, solo se recalculan si los eventos registrados cambian.
  const upcomingEvents = useMemo(() => 
    initialEvents.filter(event => !registeredEvents.includes(event.id)),
    [registeredEvents]
  );
  
  const myEvents = useMemo(() => 
    initialEvents.filter(event => registeredEvents.includes(event.id)),
    [registeredEvents]
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