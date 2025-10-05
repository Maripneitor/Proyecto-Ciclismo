// src/pages/UserHomePage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { useNotification } from '../contexts/NotificationContext';

function UserHomePage() {
  const [showModal, setShowModal] = useState(false);
  const { addNotification } = useNotification();

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleConfirmAlert = () => {
    addNotification('¡Alerta de auxilio enviada! Los organizadores han sido notificados.', 'error');
    handleCloseModal();
  };

  return (
    <div>
      <div className="card text-center">
        <div className="card-header fw-bold">Carrera "Ruta del Sol"</div>
        <div className="card-body">
          <img src="https://i.imgur.com/3Z0aJp8.png" alt="Mapa de la ruta" className="img-fluid" />
          <p className="mt-3">Número de competidor: <strong>CC-01-138</strong></p>
          <Link to="/user/route-details" className="btn btn-info mt-2">
            <i className="bi bi-geo-alt-fill me-2"></i>Ver Detalles de mi Ruta
          </Link>
        </div>
      </div>
      <div className="d-grid gap-2 mt-3">
        <button onClick={handleShowModal} className="btn btn-danger btn-lg">
          <i className="bi bi-exclamation-octagon-fill me-2"></i>
          ALERTA DE AUXILIO
        </button>
      </div>

      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Alerta de Auxilio</Modal.Title>
        </Modal.Header>
        <Modal.Body>¿Estás seguro de que quieres enviar una alerta de auxilio? Se notificará a los organizadores con tu ubicación actual.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>Cancelar</Button>
          <Button variant="danger" onClick={handleConfirmAlert}>Sí, Enviar Alerta</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default UserHomePage;