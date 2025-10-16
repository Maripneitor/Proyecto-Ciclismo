// src/components/EventCard.jsx
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { useAuth } from "../contexts/AuthContext";
import PriceDisplay from './PriceDisplay';
import EventCardSkeleton from './EventCardSkeleton';
import styles from './EventCard.module.css';

// Hook para el Intersection Observer
const useOnScreen = (options) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        // Una vez visible, no necesitamos seguir observando
        observer.unobserve(entry.target);
      }
    }, options);

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return [ref, isVisible];
};


// Simulación de una función de analíticas
const trackEngagement = (eventType, payload) => {
  console.log(`[Analytics] Event: ${eventType}`, payload);
};

const EventCardContent = ({ event, isRegistered, onRegister }) => {
  const { currentUser } = useAuth();
  // Simulación, en un caso real esto vendría del perfil del usuario
  const isPlusUser = currentUser?.email.includes('juan'); 

  // --- Lógica de Badges Condicionales ---
  const badges = useMemo(() => {
    const badgesList = [];
    const eventDate = new Date(event.date);
    const today = new Date();
    const daysUntilEvent = (eventDate - today) / (1000 * 3600 * 24);

    if (daysUntilEvent > 0 && daysUntilEvent < 14) {
      badgesList.push({ bg: 'info', text: 'Próximo' });
    }
    if (event.type === 'Mixto') { // Simulación de evento popular
      badgesList.push({ bg: 'primary', text: 'Popular' });
    }
    if (isPlusUser) {
        badgesList.push({ bg: 'warning', text: 'Descuento PLUS' });
    }
    return badgesList;
  }, [event.date, event.type, isPlusUser]);

  // --- Botón de Acción Contextual ---
  const ActionButton = useCallback(() => {
    if (currentUser?.role === 'organizer') {
      return <Button variant="outline-primary" onClick={() => trackEngagement('manage_click', { eventId: event.id })}>Gestionar</Button>;
    }
    if (isRegistered) {
      return <Button variant="outline-danger" onClick={() => onRegister(event.id)}>Anular Inscripción</Button>;
    }
    return <Button variant="success" onClick={() => onRegister(event.id)}>Inscribirme</Button>;
  }, [currentUser, isRegistered, onRegister, event.id]);


  return (
    <Card 
      className={styles.eventCard}
      onMouseEnter={() => trackEngagement('card_hover', { eventId: event.id })}
    >
      <div className={styles.imageContainer}>
        <picture>
          <source srcSet={`https://picsum.photos/seed/${event.id}/400/200.webp`} type="image/webp" />
          <img
            src={`https://picsum.photos/seed/${event.id}/400/200.jpg`}
            alt={event.name}
            className="card-img-top"
            loading="lazy"
          />
        </picture>
        <div className={styles.badgeContainer}>
          {badges.map(badge => <Badge key={badge.text} bg={badge.bg}>{badge.text}</Badge>)}
        </div>
      </div>
      <Card.Body>
        <Card.Title>{event.name}</Card.Title>
        <Card.Text className="text-muted">
          <i className="bi bi-calendar-event me-2"></i>{event.date} <br />
          <i className="bi bi-geo-alt me-2"></i>{event.description.substring(0, 25)}...
        </Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <PriceDisplay basePrice={350} isPlusUser={isPlusUser} />
          <ActionButton />
        </div>
      </Card.Body>
    </Card>
  );
};


// --- Componente Envoltorio con Lazy Loading ---
const EventCard = ({ event, ...props }) => {
    const [ref, isVisible] = useOnScreen({ threshold: 0.1 });

    return (
        <div ref={ref} className={styles.cardWrapper}>
            {isVisible ? <EventCardContent event={event} {...props} /> : <EventCardSkeleton />}
        </div>
    );
};

export default EventCard;