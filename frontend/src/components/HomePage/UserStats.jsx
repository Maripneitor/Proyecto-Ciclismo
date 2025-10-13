// src/components/HomePage/UserStats.jsx
import React from 'react';
import { Row, Col, Card, ProgressBar } from 'react-bootstrap';
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import styles from './UserStats.module.css';

const kmData = [
  { name: 'Ene', km: 30 }, { name: 'Feb', km: 50 },
  { name: 'Mar', km: 80 }, { name: 'Abr', km: 60 },
];

const UserStats = () => {
  return (
    <div className={styles.statsContainer}>
      <h3 className="text-center mb-4">Tu Progreso Personal</h3>
      <Row>
        <Col md={4} className="mb-3">
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title>Próximo Evento</Card.Title>
              <Card.Text className="fs-4 fw-bold text-success">Reto de Montaña</Card.Text>
              <p className="text-muted">en 14 días</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title>KM Recorridos (Mes)</Card.Title>
              <div style={{ height: '80px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={kmData}>
                    <Tooltip />
                    <Line type="monotone" dataKey="km" stroke="#007bff" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-3">
          <Card className="text-center h-100">
            <Card.Body>
              <Card.Title>Logros Desbloqueados</Card.Title>
              <p className="fs-1">🏅 🏆 ⚫️</p>
              <ProgressBar now={66} variant="warning" />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserStats;