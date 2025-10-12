// src/components/HomePage/HeroSection.jsx
import React, { useContext } from 'react';
import { Carousel, Button } from 'react-bootstrap';
import { EventContext } from '../../contexts/EventContext';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  const { events } = useContext(EventContext);
  // Tomamos los 3 primeros eventos como destacados para el carrusel
  const featuredEvents = events.slice(0, 3);

  return (
    <Carousel interval={6000} pause="hover" className={styles.heroCarousel}>
      {featuredEvents.map((event, index) => (
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
              <Button variant="primary" className="me-2">Ver Detalles</Button>
              <Button variant="outline-light">Inscribirme</Button>
            </div>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default HeroSection;