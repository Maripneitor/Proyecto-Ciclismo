// src/pages/UserNotificationsPage.jsx
import React from 'react';

const notifications = [
    { id: 1, text: '¡Te has inscrito a Reto de Montaña!', date: 'Hace 5 minutos', read: false },
    { id: 2, text: 'Tu evento Carrera del Bosque ha sido actualizado.', date: 'Hace 2 horas', read: true },
    { id: 3, text: 'Bienvenido a Ciclomex, Juan!', date: 'Ayer', read: true },
];

function UserNotificationsPage() {
  return (
    <div>
      <h3 className="mb-4">Notificaciones</h3>
      <div className="list-group">
        {notifications.map(notif => (
          <div key={notif.id} className={`list-group-item ${!notif.read ? 'list-group-item-info' : ''}`}>
            <div className="d-flex w-100 justify-content-between">
              <p className="mb-1">{notif.text}</p>
              <small>{notif.date}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserNotificationsPage;