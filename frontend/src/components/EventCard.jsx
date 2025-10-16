// frontend/src/components/EventCard.jsx (CORREGIDO)

import React from 'react';
import styles from './EventCard.module.css';

// 1. CORRECCIÓN: './ui/' para buscar en la subcarpeta 'ui' dentro de 'components'
import ButtonSport from './ui/ButtonSport'; 
import BadgeSport from './ui/BadgeSport';

// 2. CORRECCIÓN: './' para buscar en el mismo directorio 'components'
// Asumiendo que PriceDisplay está en: frontend/src/components/PriceDisplay.jsx
import PriceDisplay from './PriceDisplay'; 

// ... resto del componente EventCard

const EventCard = ({ event }) => {
  const {
    id,
    nombre,
    fecha,
    lugar,
    tipoDeporte,
    precioBase,
    precioPlus,
    imagenUrl,
    inscripcionesAbiertas,
  } = event;

  const handleInscribirse = () => {
    // Lógica para navegar a la página de detalle/inscripción
    console.log(`Inscribirse al evento ${id}: ${nombre}`);
  };

  const formattedDate = new Date(fecha).toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className={styles.card}>
      <div
        className={styles.imageContainer}
        style={{ backgroundImage: `url(${imagenUrl})` }}
      >
        <BadgeSport sport={tipoDeporte} className={styles.badge} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{nombre}</h3>
        <p className={styles.info}>
          📅 {formattedDate} | 📍 {lugar}
        </p>
        <div className={styles.priceSection}>
          <PriceDisplay basePrice={precioBase} plusPrice={precioPlus} />
        </div>
        <ButtonSport
          onClick={handleInscribirse}
          disabled={!inscripcionesAbiertas}
          variant={inscripcionesAbiertas ? 'primary' : 'disabled'}
        >
          {inscripcionesAbiertas ? 'Inscribirme' : 'Cerrado'}
        </ButtonSport>
      </div>
    </div>
  );
};

export default EventCard;