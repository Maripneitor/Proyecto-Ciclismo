import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import styles from './OrganizerDashboardPage.module.css';

const OrganizerDashboardPage = () => {
    return (
        <Container className={styles.dashboardContainer}>
            <h1 className="mb-4">Panel de Organizador</h1>
            <Row>
                <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Gestionar Eventos</Card.Title>
                            <Card.Text>
                                Aquí puedes crear, editar y ver el estado de tus eventos.
                            </Card.Text>
                            <Button variant="primary">Ir a Mis Eventos</Button>
                        </Card.Body>
                    </Card>
                </Col>
                 <Col md={6}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Ver Estadísticas</Card.Title>
                            <Card.Text>
                                Analiza la inscripción y participación en tus eventos.
                            </Card.Text>
                            <Button variant="secondary">Ver Reportes</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default OrganizerDashboardPage;