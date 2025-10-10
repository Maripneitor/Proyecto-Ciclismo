// src/pages/EventManagementPage.jsx
import React, { useState, useCallback } from 'react';
import { useEvents } from "../hooks/useEvents";
import EventForm from '../components/EventManagement/EventForm';
import EventList from '../components/EventManagement/EventList';
import { useNotification } from '../contexts/NotificationContext';

const emptyFormState = { id: null, name: '', date: '', description: '', distance: '', type: 'Mixto' };

function EventManagementPage() {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const { addNotification } = useNotification();

  const [formData, setFormData] = useState(emptyFormState);
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleCancel = useCallback(() => {
    setFormData(emptyFormState);
    setIsEditing(false);
  }, []);

  const handleFormSubmit = useCallback((e) => {
    e.preventDefault();
    if (isEditing) {
      updateEvent(formData);
      addNotification('¡Evento actualizado con éxito!', 'success');
    } else {
      addEvent(formData);
      addNotification('¡Evento creado con éxito!', 'success');
    }
    handleCancel();
  }, [formData, isEditing, addEvent, updateEvent, handleCancel, addNotification]);
  
  const handleSelectEvent = useCallback((event) => {
    setFormData(event);
    setIsEditing(true);
  }, []);
  
  const handleDelete = useCallback(() => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este evento?")) {
      deleteEvent(formData.id);
      addNotification('Evento eliminado.', 'error');
      handleCancel();
    }
  }, [formData.id, deleteEvent, handleCancel, addNotification]);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Gestión de Eventos</h1>
        <button className="btn btn-outline-primary" onClick={handleCancel}>
          <i className="bi bi-plus-circle me-2"></i>Crear Nuevo Evento
        </button>
      </div>
      <div className="row">
        <div className="col-lg-7">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">{isEditing ? `Editando: ${formData.name}` : 'Crear Nuevo Evento'}</h5>
                {isEditing && <button className="btn btn-sm btn-outline-danger" onClick={handleDelete}><i className="bi bi-trash"></i> Eliminar</button>}
              </div>
              <EventForm
                formData={formData}
                isEditing={isEditing}
                onInputChange={handleInputChange}
                onFormSubmit={handleFormSubmit}
                onCancel={handleCancel}
              />
            </div>
          </div>
        </div>
        <div className="col-lg-5">
          <h4 className="mb-3">Lista de Eventos</h4>
          <EventList
            events={events}
            selectedId={formData.id}
            onSelectEvent={handleSelectEvent}
          />
        </div>
      </div>
    </>
  );
}

export default EventManagementPage;