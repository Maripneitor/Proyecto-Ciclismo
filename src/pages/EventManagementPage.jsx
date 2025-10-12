// src/pages/EventManagementPage.jsx
import React, { useState, useCallback } from 'react';
import { useEvents } from "../hooks/useEvents";
import EventForm from '../components/EventManagement/EventForm';
import EventList from '../components/EventManagement/EventList';
import { useNotification } from '../contexts/NotificationContext';
import { Modal, Button } from 'react-bootstrap'; // Importar Modal y Button

const emptyFormState = { id: null, name: '', date: '', description: '', distance: '', type: 'Mixto' };

function EventManagementPage() {
  const { events, addEvent, updateEvent, deleteEvent } = useEvents();
  const { addNotification } = useNotification();

  const [formData, setFormData] = useState(emptyFormState);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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
    if (!formData.name || !formData.date || !formData.distance) {
      addNotification('Por favor, completa los campos requeridos.', 'error');
      return;
    }
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
  
  const confirmDelete = () => {
    deleteEvent(formData.id);
    addNotification('Evento eliminado.', 'info');
    handleCancel();
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* ... */}
      </div>
      <div className="row">
        <div className="col-lg-7">
          <div className="card">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="card-title mb-0">{isEditing ? `Editando: ${formData.name}` : 'Crear Nuevo Evento'}</h5>
                {isEditing && <Button variant="outline-danger" size="sm" onClick={() => setShowDeleteModal(true)}><i className="bi bi-trash"></i> Eliminar</Button>}
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
            {/* ... */}
        </div>
      </div>

      {/* Modal de Confirmación para Eliminar */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que quieres eliminar el evento "{formData.name}"? Esta acción no se puede deshacer.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancelar</Button>
          <Button variant="danger" onClick={confirmDelete}>Sí, Eliminar</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EventManagementPage;
