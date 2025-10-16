// src/pages/UserProfilePage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from "../contexts/AuthContext"; // <-- CORRECCIÓN: La importación apunta a la carpeta de hooks
import { useNotification } from '../contexts/NotificationContext';

function UserProfilePage() {
  const { currentUser, updateUser } = useAuth();
  const { addNotification } = useNotification();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
    }
  }, [currentUser]);

  if (!currentUser) {
    return <p className="text-center">Cargando perfil...</p>;
  }

  const handleSave = () => {
    updateUser({ name });
    setIsEditing(false);
    addNotification("Perfil actualizado exitosamente.", "success");
  };

  return (
    <div className="text-center">
        <img src={`https://i.pravatar.cc/150?u=${currentUser.id}`} alt="Avatar" className="rounded-circle mb-3" />
        
        {isEditing ? (
          <div className="input-group mb-3">
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
            <button className="btn btn-success" onClick={handleSave}>Guardar</button>
          </div>
        ) : (
          <h3 className="mb-3">{currentUser.name}</h3>
        )}

        <p className="text-muted">{currentUser.email}</p>
        
        {!isEditing && (
            <button className="btn btn-primary" onClick={() => setIsEditing(true)}>
                <i className="bi bi-pencil-fill me-2"></i>Editar Perfil
            </button>
        )}
        
        <hr/>
        <ul className="list-group text-start">
            <li className="list-group-item"><strong>Rol:</strong> {currentUser.role}</li>
            <li className="list-group-item"><strong>Miembro desde:</strong> 2024</li>
        </ul>

        <hr/>
        <h4 className="text-start mt-4 mb-3">Mis Logros</h4>
        <div className="d-flex justify-content-start gap-3">
            <span className="fs-1" title="Completó 5 carreras">🏅</span>
            <span className="fs-1" title="Top 10 en una carrera">🏆</span>
            <span className="fs-1 text-muted" title="Completar 10 carreras (bloqueado)">⚫</span>
        </div>
    </div>
  );
}

export default UserProfilePage;