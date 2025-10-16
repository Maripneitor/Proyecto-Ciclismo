import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { EventContext } from '../../contexts/EventContext';
import styles from './EventDetailPage.module.css';

const EventDetailPage = () => {
    const { eventId } = useParams();
    const { events, loading, error } = useContext(EventContext);

    if (loading) {
        return <div className="text-center mt-5"><Spinner animation="border" /></div>;
    }

    if (error) {
        return <Alert variant="danger">Error al cargar el evento.</Alert>;
    }

    const event = events.find(e => e.id.toString() === eventId);

    if (!event) {
        return <Alert variant="warning">Evento no encontrado.</Alert>;
    }

    return (
        <Container className={styles.detailContainer}>
            <Row>
                <Col md={8}>
                    <Card>
                        <Card.Img variant="top" src={`https://picsum.photos/seed/${event.id}/800/400`} />
                        <Card.Body>
                            <Card.Title as="h1">{event.name}</Card.Title>
                            <div className="mb-3">
                                <Badge bg="primary" className="me-2">{event.type || 'Mixto'}</Badge>
                                <Badge bg="secondary">{event.distance || '25'}km</Badge>
                            </div>
                            <p>{event.description}</p>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md={4}>
                    <Card>
                        <Card.Header as="h5">Detalles del Evento</Card.Header>
                        <Card.Body>
                            <p><strong>Fecha:</strong> {new Date(event.date).toLocaleDateString()}</p>
                            <p><strong>Ubicación:</strong> {event.location || 'Ciudad Principal'}</p>
                            <p><strong>Precio:</strong> <span className={styles.price}>${event.price || '50.00'}</span></p>
                            <Button variant="success" className="w-100">Inscribirme Ahora</Button>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default EventDetailPage;