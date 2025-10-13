// src/pages/RouteDetailPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function RouteDetailPage() {
    return (
        <div>
            <Link to="/user/home" className="btn btn-outline-secondary mb-3">
                <i className="bi bi-arrow-left"></i> Volver a la Carrera
            </Link>

            <div className="card">
                <div className="card-header text-center fw-bold">
                    Mi Progreso en: Carrera del Bosque
                </div>
                <div className="card-body">
                    <p className="text-center">Aquí puedes ver tu ubicación actual en el mapa de la ruta.</p>
                    {/* Idealmente, este sería un mapa interactivo (ej. Leaflet o Google Maps). Por ahora, usamos una imagen con un marcador. */}
                    <img src="https://i.imgur.com/Xq302G8.png" alt="Usuario en el mapa" className="img-fluid rounded" />
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item"><strong>Distancia Recorrida:</strong> 7.2 KM</li>
                    <li className="list-group-item"><strong>Tiempo Actual:</strong> 00:55:10</li>
                    <li className="list-group-item"><strong>Próximo Punto de Control:</strong> 1.3 KM</li>
                </ul>
            </div>
        </div>
    );
}

export default RouteDetailPage;