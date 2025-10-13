// src/components/ui/CardEvent.jsx
import React from 'react';
import BadgeSport from './BadgeSport';
import ButtonSport from './ButtonSport';
import styles from './CardEvent.module.css';

const CardEvent = ({
  event,
  viewMode = 'grid', // 'grid' or 'list'
  className = ''
}) => {
  const { name, date, description, type } = event;

  return (
    <div className={`${styles.card} ${styles[viewMode]} scale-hover ${className}`}>
      <div className={styles.imageContainer}>
        <img src={`https://picsum.photos/seed/${event.id}/600/400`} alt={name} />
        <div className={styles.badgeWrapper}>
            <BadgeSport variant="category">{type}</BadgeSport>
        </div>
      </div>
      <div className={styles.content}>
        <span className={styles.date}>{date}</span>
        <h3 className={styles.title}>{name}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.actions}>
            <ButtonSport>Inscribirme</ButtonSport>
            <ButtonSport variant="outline">Ver Detalles</ButtonSport>
        </div>
      </div>
    </div>
  );
};

export default CardEvent;

