import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import styles from './UserDashboardPage.module.css';

const UserDashboardPage = () => {
    return (
        <Container className={styles.dashboardContainer}>
            <h1 className="mb-4">Mi Panel de Usuario</h1>
            <Row>
                <Col md={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Eventos Inscritos</Card.Title>
                            <Card.Text className={styles.statNumber}>3</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Próximo Evento</Card.Title>
                             <Card.Text>Carrera del Bosque</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                 <Col md={4}>
                    <Card className="text-center">
                        <Card.Body>
                            <Card.Title>Notificaciones</Card.Title>
                            <Card.Text className={styles.statNumber}>2</Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default UserDashboardPage;