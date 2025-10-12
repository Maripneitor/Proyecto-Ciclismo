// src/components/HomePage/HeroSection.jsx
import React from 'react';
import { Carousel, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEvents } from '../../hooks/useEvents';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../contexts/NotificationContext';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  const { events } = useEvents();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  
  const featuredEvents = events.slice(0, 3);

  const handleRegisterClick = () => {
    if (!currentUser) {
      navigate('/login');
    } else {
      addNotification('¡Inscripción exitosa desde el carrusel!', 'success');
      // Aquí podrías añadir lógica adicional, como redirigir a la página de eventos.
    }
  };

  return (
    <Carousel interval={6000} pause="hover" className={styles.heroCarousel}>
      {featuredEvents.map((event) => (
        <Carousel.Item key={event.id}>
          <img
            className={`d-block w-100 ${styles.carouselImage}`}
            src={`https://picsum.photos/seed/${event.id}/1400/500`}
            alt={event.name}
          />
          <Carousel.Caption className={styles.carouselCaption}>
            <h3>{event.name}</h3>
            <p>{event.date} - {event.description.substring(0, 50)}...</p>
            <div>
              <Button as={Link} to="/user/events" variant="primary" className="me-2">Ver Detalles</Button>
              <Button variant="outline-light" onClick={handleRegisterClick}>Inscribirme</Button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HeroSection;