// src/pages/EventManagementPage.jsx
import React, { useState } from 'react';
// Quitamos la importación de OrganizerLayout

const initialEvents = [
    { id: 1, name: 'Carrera del Bosque', date: '2025-10-10', description: 'Una carrera escénica a través del bosque.', distance: 10, type: 'Femenil' },
    { id: 2, name: 'Reto de Montaña', date: '2025-11-05', description: 'Conquista las cimas más altas.', distance: 25, type: 'Varonil' },
    { id: 3, name: 'Tour de la Ciudad', date: '2025-11-20', description: 'Recorre los puntos más icónicos.', distance: 15, type: 'Mixto' }
];
const emptyFormState = { id: null, name: '', date: '', description: '', distance: '', type: 'Mixto' };

function EventManagementPage() {
  const [events, setEvents] = useState(initialEvents);
  const [formData, setFormData] = useState(emptyFormState);
  const [isEditing, setIsEditing] = useState(false);

  // ... (toda la lógica de los handlers se mantiene igual)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      setEvents(events.map(event => event.id === formData.id ? formData : event));
      alert('¡Evento actualizado con éxito!');
    } else {
      const newEvent = { ...formData, id: Date.now() };
      setEvents([...events, newEvent]);
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
        setEvents(events.filter(event => event.id !== eventId));
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
        {/* Columna del Formulario */}
        <div className="col-lg-7">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">{isEditing ? 'Editando Evento' : 'Crear Nuevo Evento'}</h5>
                {isEditing && <button className="btn btn-sm btn-outline-danger" onClick={() => handleDeleteEvent(formData.id)}>Eliminar</button>}
              </div>

              <form onSubmit={handleFormSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre del evento:</label>
                  <input type="text" name="name" className="form-control" value={formData.name} onChange={handleInputChange} required/>
                </div>
                <div className="mb-3">
                  <label className="form-label">Fecha del evento:</label>
                  <input type="date" name="date" className="form-control" value={formData.date} onChange={handleInputChange} required/>
                </div>
                <div className="mb-3">
                  <label className="form-label">Descripción:</label>
                  <textarea name="description" className="form-control" rows="3" value={formData.description} onChange={handleInputChange}></textarea>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Distancia (KM):</label>
                        <input type="number" name="distance" className="form-control" value={formData.distance} onChange={handleInputChange} required/>
                    </div>
                    <div className="col-md-6 mb-3">
                        <label className="form-label">Categoría:</label>
                        <select name="type" className="form-select" value={formData.type} onChange={handleInputChange}>
                            <option>Mixto</option>
                            <option>Femenil</option>
                            <option>Varonil</option>
                        </select>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary me-2">{isEditing ? 'Actualizar Evento' : 'Guardar Evento'}</button>
                <button type="button" className="btn btn-secondary" onClick={handleCreateNew}>Limpiar Formulario</button>
              </form>
            </div>
          </div>
        </div>

        {/* Columna de la Lista de Eventos */}
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