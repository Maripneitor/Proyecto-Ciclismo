import React from 'react';
import OrganizerLayout from '../layouts/OrganizerLayout';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function StatisticsPage() {
  const statsData = [
    { position: 1, id: 'C-001', competitor: 'Juan Pérez', time: '01:25:30', timeMinutes: 85 },
    { position: 2, id: 'C-005', competitor: 'Ana Gómez', time: '01:26:10', timeMinutes: 86 },
    { position: 3, id: 'C-012', competitor: 'Luis Martínez', time: '01:27:05', timeMinutes: 87 },
    { position: 4, id: 'C-003', competitor: 'Sofía López', time: '01:28:00', timeMinutes: 88 },
  ];

  return (
    <OrganizerLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Estadísticas del Evento</h1>
        <button className="btn btn-outline-primary">
          <i className="bi bi-download me-2"></i>Exportar a...
        </button>
      </div>

      {/* Gráfica */}
      <div className="card mb-4">
        <div className="card-body">
            <h5 className="card-title">Tiempos de Competidores (en minutos)</h5>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={statsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="competitor" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="timeMinutes" fill="#007bff" />
                </BarChart>
            </ResponsiveContainer>
        </div>
      </div>

      {/* Tabla de Datos */}
      <div className="card">
        <div className="card-body">
          <table className="table table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">Posición</th>
                <th scope="col">N° Identificador</th>
                <th scope="col">Competidor</th>
                <th scope="col">Tiempo</th>
              </tr>
            </thead>
            <tbody>
              {statsData.map(row => (
                <tr key={row.id} className={row.position === 1 ? 'table-warning' : ''}>
                  <th scope="row">
                    {row.position} {row.position === 1 ? '🏆' : ''}
                  </th>
                  <td>{row.id}</td>
                  <td>{row.competitor}</td>
                  <td>{row.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </OrganizerLayout>
  );
}

export default StatisticsPage;