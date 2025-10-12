// src/pages/CategoryPage.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useEvents } from '../hooks/useEvents';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const { events } = useEvents();

  // Filtra los eventos por la categoría (insensible a mayúsculas/minúsculas)
  const filteredEvents = events.filter(
    event => event.type.toLowerCase() === categoryName.toLowerCase()
  );

  return (
    <Container className="my-5">
      <h1 className="mb-4">
        Eventos de: <span className="text-capitalize">{categoryName}</span>
      </h1>
      
      <Row>
        {filteredEvents.length > 0 ? (
          filteredEvents.map(event => (
            <Col md={4} key={event.id} className="mb-4">
              <Card>
                <Card.Img variant="top" src={`https://picsum.photos/seed/${event.id}/400/200`} />
                <Card.Body>
                  <Card.Title>{event.name}</Card.Title>
                  <Card.Text>{event.description}</Card.Text>
                  <Button as={Link} to="/user/events" variant="primary">Ver Detalles</Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <Col>
            <p>No se encontraron eventos para esta categoría.</p>
          </Col>
        )}
      </Row>
      
      <div className="text-center mt-4">
        <Link to="/" className="btn btn-outline-secondary">
          Volver al Inicio
        </Link>
      </div>
    </Container>
  );
};

export default CategoryPage;