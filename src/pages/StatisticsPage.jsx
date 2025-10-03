import React from 'react';
import OrganizerLayout from '../layouts/OrganizerLayout';

function StatisticsPage() {
  // Datos de ejemplo para la tabla
  const statsData = [
    { position: 1, id: 'C-001', competitor: 'Juan Pérez', time: '01:25:30' },
    { position: 2, id: 'C-005', competitor: 'Ana Gómez', time: '01:26:10' },
    { position: 3, id: 'C-012', competitor: 'Luis Martínez', time: '01:27:05' },
    // ... más datos
  ];

  return (
    <OrganizerLayout>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Estadísticas</h1>
        <button className="btn btn-outline-secondary">Exportar a...</button>
      </div>

      <div className="card">
        <div className="card-body">
          <table className="table table-striped">
            <thead>
              <tr>
                <th scope="col">Posición</th>
                <th scope="col">N° Identificador</th>
                <th scope="col">Competidor</th>
                <th scope="col">Tiempo</th>
              </tr>
            </thead>
            <tbody>
              {statsData.map(row => (
                <tr key={row.id}>
                  <th scope="row">{row.position}</th>
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