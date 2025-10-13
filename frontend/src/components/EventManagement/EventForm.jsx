// src/components/EventManagement/EventForm.jsx
import React from 'react';

const EventForm = React.memo(({ formData, isEditing, onInputChange, onFormSubmit, onCancel }) => {
  return (
    <form onSubmit={onFormSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Nombre del Evento</label>
        <input type="text" className="form-control" id="name" name="name" value={formData.name} onChange={onInputChange} required />
      </div>
      <div className="row">
        <div className="col-md-6 mb-3">
          <label htmlFor="date" className="form-label">Fecha</label>
          <input type="date" className="form-control" id="date" name="date" value={formData.date} onChange={onInputChange} required />
        </div>
        <div className="col-md-6 mb-3">
          <label htmlFor="distance" className="form-label">Distancia (KM)</label>
          <input type="number" className="form-control" id="distance" name="distance" value={formData.distance} onChange={onInputChange} required />
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Descripción</label>
        <textarea className="form-control" id="description" name="description" rows="3" value={formData.description} onChange={onInputChange}></textarea>
      </div>
      <div className="d-flex justify-content-end gap-2">
        {isEditing && <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancelar</button>}
        <button type="submit" className="btn btn-success">{isEditing ? 'Actualizar Evento' : 'Crear Evento'}</button>
      </div>
    </form>
  );
});

EventForm.displayName = 'EventForm';
export default EventForm;