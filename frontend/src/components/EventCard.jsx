import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importa Link
import { useAuth } from "../contexts/AuthContext";
import styles from './EventCard.module.css';

const EventCard = ({ event }) => {
  const { currentUser } = useAuth();

  return (
    <Card className={styles.eventCard}>
      <Link to={`/event/${event.id}`} className={styles.cardLink}>
        <div className={styles.imageContainer}>
            <Card.Img 
              variant="top" 
              src={`https://picsum.photos/seed/${event.id}/400/200`} 
              alt={event.name}
            />
            <div className={styles.badgeContainer}>
                <Badge bg="info">PRÓXIMO</Badge>
            </div>
        </div>
        <Card.Body>
            <Card.Title>{event.name}</Card.Title>
            <Card.Text className="text-muted">
                <i className="bi bi-calendar-event me-2"></i>{new Date(event.date).toLocaleDateString()}
            </Card.Text>
        </Card.Body>
      </Link>
      <Card.Footer className="d-flex justify-content-between align-items-center">
          <span className={styles.price}>${event.price || '50.00'}</span>
          <Button as={Link} to={`/event/${event.id}`} variant="primary">Ver Detalles</Button>
      </Card.Footer>
    </Card>
  );
};

export default EventCard;