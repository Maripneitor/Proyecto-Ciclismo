// src/pages/EventManagementPage.jsx
import React, { useState, useEffect } from 'react';
import { useEvents } from '../contexts/EventContext';

const emptyFormState = { id: null, name: '', date: '', description: '', distance: '', type: 'Mixto' };

function EventManagementPage() {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const [formData, setFormData] = useState(emptyFormState);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateEvent(formData);
      alert('¡Evento actualizado con éxito!');
    } else {
      addEvent(formData);
      alert('¡Evento creado con éxito!');
    }
    setFormData(emptyFormState);
    setIsEditing(false);
  };

  const handleSelectEvent = (event) => {
    setFormData(event);
    setIsEditing(true);
  };

  const handleCreateNew = () => {
    setFormData(emptyFormState);
    setIsEditing(false);
  };
  
  const handleDeleteEvent = (eventId) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este evento?")) {
        deleteEvent(eventId);
        alert('Evento eliminado.');
        if (formData.id === eventId) {
            handleCreateNew();
        }
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Gestión de Eventos</h1>
        <button className="btn btn-outline-secondary"><i className="bi bi-share me-1"></i> Compartir</button>
      </div>

      <div className="row">
        <div className="col-lg-7">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">{isEditing ? `Editando: ${formData.name}` : 'Crear Nuevo Evento'}</h5>
                {isEditing && <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteEvent(formData.id)}>Eliminar</button>}
              </div>
              <form onSubmit={handleFormSubmit}>
                  {/* ... (el resto del formulario se mantiene igual, ya está preparado para esto) ... */}
              </form>
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <h4 className="mb-3">Lista de Eventos</h4>
          <div className="list-group">
            {events.map((event) => (
                <button type="button" key={event.id} className={`list-group-item list-group-item-action ${formData.id === event.id ? 'active' : ''}`} onClick={() => handleSelectEvent(event)}>
                    <div className="d-flex w-100 justify-content-between">
                        <h5 className="mb-1">{event.name}</h5>
                        <small>{event.date}</small>
                    </div>
                    <p className="mb-1">{event.description || 'Sin descripción.'}</p>
                    <small>{event.type} - {event.distance} KM</small>
                </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default EventManagementPage;