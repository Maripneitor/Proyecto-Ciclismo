// src/pages/UserHomePage.jsx
import React from 'react';

function UserHomePage() {
  const handleAlert = () => {
    alert("¡ALERTA DE AUXILIO ENVIADA! Tu ubicación ha sido compartida con el organizador.");
  };

  return (
    <div>
      <div className="card text-center">
        <div className="card-header">
          Carrera "Ruta del Sol"
        </div>
        <div className="card-body">
          {/* Aquí iría un componente de mapa real, por ahora es una imagen */}
          <img src="https://i.imgur.com/3Z0aJp8.png" alt="Mapa de la ruta" className="img-fluid" />
          <p className="mt-3">Número de competidor: <strong>CC-01-138</strong></p>
        </div>
      </div>
      <div className="d-grid gap-2 mt-3">
        <button onClick={handleAlert} className="btn btn-danger btn-lg">
          <i className="bi bi-exclamation-octagon-fill me-2"></i>
          ALERTA DE AUXILIO
        </button>
      </div>
    </div>
  );
}

export default UserHomePage;