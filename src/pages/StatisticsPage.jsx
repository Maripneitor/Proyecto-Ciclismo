// src/pages/StatisticsPage.jsx
import React, { useState, useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Nav, Tab } from 'react-bootstrap';

const statsData = [
    { position: 1, id: 'C-001', competitor: 'Juan Pérez', time: '01:25:30' },
    { position: 2, id: 'C-005', competitor: 'Ana Gómez', time: '01:26:10' },
    { position: 3, id: 'C-012', competitor: 'Luis Martínez', time: '01:27:05' },
    { position: 4, id: 'C-003', competitor: 'Sofía López', time: '01:28:00' },
];

const scatterData = [
  { sector: 1, time: 15.2 }, { sector: 1, time: 16.1 }, { sector: 1, time: 14.8 },
  { sector: 2, time: 32.5 }, { sector: 2, time: 35.0 }, { sector: 2, time: 33.4 },
  { sector: 3, time: 50.1 }, { sector: 3, time: 55.3 }, { sector: 3, time: 52.9 },
  { sector: 4, time: 85.5 }, { sector: 4, time: 86.2 }, { sector: 4, time: 87.1 },
];

// Componente memoizado para el gráfico, evita re-renders innecesarios.
const MemoizedScatterChart = React.memo(({ data }) => (
  <ResponsiveContainer width="100%" height={400}>
    <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
      <CartesianGrid />
      <XAxis type="number" dataKey="sector" name="Sector" unit="" domain={['dataMin - 1', 'dataMax + 1']} tickCount={4} />
      <YAxis type="number" dataKey="time" name="Tiempo" unit=" min" />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Scatter name="Tiempos de competidores" data={data} fill="var(--primary-green)" />
    </ScatterChart>
  </ResponsiveContainer>
));
MemoizedScatterChart.displayName = 'MemoizedScatterChart'; // Ayuda para depurar

function StatisticsPage() {
  const [activeTab, setActiveTab] = useState('general');

  // useMemo asegura que la referencia a los datos no cambie entre renders
  const memoizedScatterData = useMemo(() => scatterData, []);

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Estadísticas del Evento</h1>
        <button className="btn btn-outline-primary"><i className="bi bi-download me-2"></i>Exportar</button>
      </div>
      <Tab.Container activeKey={activeTab} onSelect={(k) => setActiveTab(k)}>
        <Nav variant="pills" className="mb-3">
          <Nav.Item><Nav.Link eventKey="general">Tiempos Generales</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="sectors">Tiempos por Sector</Nav.Link></Nav.Item>
        </Nav>
        <Tab.Content>
          <Tab.Pane eventKey="general">
            <div className="card"><div className="card-body">
                <table className="table table-hover">
                  <thead className="table-dark">
                    <tr><th scope="col">Posición</th><th scope="col">N° Identificador</th><th scope="col">Competidor</th><th scope="col">Tiempo Final</th></tr>
                  </thead>
                  <tbody>{statsData.map(row => (<tr key={row.id} className={row.position === 1 ? 'table-warning' : ''}><th scope="row">{row.position} {row.position === 1 ? '🏆' : ''}</th><td>{row.id}</td><td>{row.competitor}</td><td>{row.time}</td></tr>))}</tbody>
                </table>
            </div></div>
          </Tab.Pane>
          <Tab.Pane eventKey="sectors">
            <div className="card"><div className="card-body">
                <h5 className="card-title">Análisis de Tiempos por Sector (minutos)</h5>
                <p className="card-subtitle mb-2 text-muted">Muestra la dispersión de los tiempos en cada punto de control.</p>
                <MemoizedScatterChart data={memoizedScatterData} />
            </div></div>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </>
  );
}
export default StatisticsPage;