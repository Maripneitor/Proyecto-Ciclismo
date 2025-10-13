// src/components/EventManagement/EventList.jsx
import React from 'react';

const EventList = React.memo(({ events, selectedId, onSelectEvent }) => {
  return (
    <div className="list-group">
      {events.map((event) => (
        <button
          type="button"
          key={event.id}
          className={`list-group-item list-group-item-action ${selectedId === event.id ? 'active' : ''}`}
          onClick={() => onSelectEvent(event)}
        >
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{event.name}</h5>
            <small>{event.date}</small>
          </div>
          <p className="mb-1">{event.description || 'Sin descripción.'}</p>
          <small>{event.type} - {event.distance} KM</small>
        </button>
      ))}
    </div>
  );
});

EventList.displayName = 'EventList';
export default EventList;