// src/components/HomePage/FeaturedEvents.jsx
import React, { useContext, useState } from 'react';
import { Card, Button, Badge, Row, Col, Placeholder } from 'react-bootstrap';
import { EventContext } from '../../contexts/EventContext';
import styles from './FeaturedEvents.module.css';

// Componente para una tarjeta de evento individual
const EventCard = ({ event }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const isPlusUser = true; // Simulación de un usuario PLUS

    return (
        <Card className={styles.eventCard}>
            <div className={styles.imageContainer}>
                {!imageLoaded && (
                    <div className={styles.blurPlaceholder} style={{ backgroundImage: `url(https://picsum.photos/seed/${event.id}/20/10)` }}></div>
                )}
                <Card.Img
                    variant="top"
                    src={`https://picsum.photos/seed/${event.id}/400/200`}
                    alt={event.name}
                    onLoad={() => setImageLoaded(true)}
                    style={{ display: imageLoaded ? 'block' : 'none' }}
                />
                <Badge bg="info" className={styles.badgeTopLeft}>{event.type === 'Mixto' ? 'Popular' : 'Próximo'}</Badge>
            </div>
            <Card.Body>
                <Card.Title>{event.name}</Card.Title>
                <Card.Text className="text-muted">
                    <i className="bi bi-calendar-event me-2"></i>{event.date} <br />
                    <i className="bi bi-geo-alt me-2"></i>{event.description.substring(0, 20)}...
                </Card.Text>
                <div className="d-flex justify-content-between align-items-center">
                    <span className={styles.price}>
                        $350 MXN {isPlusUser && <Badge bg="warning" text="dark">15% OFF</Badge>}
                    </span>
                    <Button variant="success">Inscribirse</Button>
                </div>
            </Card.Body>
        </Card>
    );
};

const FeaturedEvents = () => {
  const { events } = useContext(EventContext);

  // Skeleton loading para simular carga inicial
  if (!events || events.length === 0) {
      return (
          <Row>
              {[...Array(3)].map((_, i) => (
                  <Col md={6} lg={4} key={i} className="mb-4">
                      <Card><Placeholder as={Card.Body} animation="glow">
                          <Placeholder xs={12} style={{height: '150px'}} />
                          <Placeholder xs={6} /> <Placeholder xs={8} />
                      </Placeholder></Card>
                  </Col>
              ))}
          </Row>
      );
  }

  return (
    <Row>
      {events.map(event => (
        <Col md={6} lg={4} key={event.id} className="mb-4">
            <EventCard event={event} />
        </Col>
      ))}
    </Row>
  );
};

export default FeaturedEvents;