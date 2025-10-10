// src/components/EventCard.jsx
import React from 'react';

const EventCard = React.memo(({ event, onRegister, isRegistered }) => {
  const buttonClass = isRegistered ? 'btn-outline-danger' : 'btn-success';
  const buttonText = isRegistered ? 'Anular Inscripción' : 'Inscribirse';

  return (
    <div className="card mb-3 shadow-sm">
      <div className="card-body">
        <h5 className="card-title">{event.name}</h5>
        {!isRegistered && <p className="card-text">{event.description}</p>}
        <p className="card-text">
          <small className="text-muted">{event.date} - {event.distance} KM {isRegistered ? '' : `- ${event.type}`}</small>
        </p>
        <button 
          className={`btn ${buttonClass}`} 
          onClick={() => onRegister(event.id)}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
});

EventCard.displayName = 'EventCard';

export default EventCard;