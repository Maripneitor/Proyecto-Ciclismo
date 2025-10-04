// src/pages/UserProfilePage.jsx
import React from 'react';

function UserProfilePage() {
  return (
    <div className="text-center">
        <img src="https://i.pravatar.cc/150" alt="Avatar" className="rounded-circle mb-3" />
        <h3>Juan Pérez</h3>
        <p className="text-muted">juan.perez@email.com</p>
        <hr/>
        <ul className="list-group text-start">
            <li className="list-group-item"><strong>Nombre:</strong> Juan Pérez</li>
            <li className="list-group-item"><strong>Género:</strong> Masculino</li>
            <li className="list-group-item"><strong>Correo:</strong> juan.perez@email.com</li>
        </ul>
        <button className="btn btn-outline-primary mt-4">Editar Perfil</button>
    </div>
  );
}

export default UserProfilePage;