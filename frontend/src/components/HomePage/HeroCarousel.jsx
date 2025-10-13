// src/components/HomePage/HeroCarousel.jsx
import React, { useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEvents } from '../../hooks/useEvents';
import { useAuth } from '../../hooks/useAuth';
import { useNotification } from '../../contexts/NotificationContext';
import { useCarousel } from '../../hooks/useCarousel';
import styles from './HeroCarousel.module.css';

// Función de seguimiento de analíticas (simulada)
const trackAnalytics = (eventName, eventData) => {
  console.log(`[Analytics] Event: ${eventName}`, eventData);
  // Aquí se podría integrar con Google Analytics, Mixpanel, etc.
};

const CarouselSlide = React.memo(({ event, isActive }) => {
  return (
    <div className={`${styles.carouselItem} ${isActive ? styles.active : ''}`}>
      <img
        className={styles.carouselImage}
        src={`https://picsum.photos/seed/${event.id}/1400/500`}
        alt={event.name}
      />
      <div className={styles.carouselCaption}>
        <h3>{event.name}</h3>
        <p>{event.date} - {event.description.substring(0, 50)}...</p>
      </div>
    </div>
  );
});
CarouselSlide.displayName = 'CarouselSlide';

const HeroCarousel = () => {
  const { events } = useEvents();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const featuredEvents = events.slice(0, 5); // Aumentamos a 5 para un carrusel más dinámico

  const {
    currentIndex,
    direction,
    carouselRef,
    nextSlide,
    prevSlide,
    setSlide,
    handleKeyDown,
  } = useCarousel(featuredEvents);

  const handleRegisterClick = useCallback((slideIndex) => {
    trackAnalytics('CarouselRegisterClick', {
      slideIndex,
      eventId: featuredEvents[slideIndex].id,
      isLoggedIn: !!currentUser,
    });

    if (!currentUser) {
      navigate('/login');
    } else {
      addNotification('¡Inscripción exitosa desde el carrusel!', 'success');
    }
  }, [currentUser, navigate, addNotification, featuredEvents]);

  return (
    <div
      ref={carouselRef}
      className={styles.carousel}
      onKeyDown={handleKeyDown}
      tabIndex="0"
      role="region"
      aria-roledescription="carousel"
    >
      <div className={styles.carouselInner}>
        {featuredEvents.map((event, index) => (
          <CarouselSlide
            key={event.id}
            event={event}
            isActive={index === currentIndex}
          />
        ))}
      </div>

      <div className={styles.carouselControls}>
        <Button variant="outline-light" onClick={prevSlide} aria-label="Previous Slide">‹</Button>
        <Button variant="outline-light" onClick={() => handleRegisterClick(currentIndex)}>
          Inscribirme
        </Button>
        <Button variant="outline-light" onClick={nextSlide} aria-label="Next Slide">›</Button>
      </div>

      <div className={styles.carouselIndicators}>
        {featuredEvents.map((_, index) => (
          <button
            key={index}
            className={index === currentIndex ? styles.active : ''}
            onClick={() => setSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;