// src/components/PriceDisplay.jsx
import React from 'react';
import { Badge } from 'react-bootstrap';
import styles from './EventCard.module.css';

const PriceDisplay = React.memo(({ basePrice, isPlusUser }) => {
  const discount = 0.15; // 15% de descuento
  const discountedPrice = basePrice * (1 - discount);

  return (
    <div className={styles.priceContainer}>
      {isPlusUser ? (
        <>
          <span className={styles.discountedPrice}>
            ${discountedPrice.toFixed(2)} MXN
          </span>
          <span className={styles.originalPrice}>
            ${basePrice.toFixed(2)}
          </span>
          <Badge bg="warning" text="dark" className="ms-2">PLUS {discount * 100}% OFF</Badge>
        </>
      ) : (
        <span className={styles.price}>
          ${basePrice.toFixed(2)} MXN
        </span>
      )}
    </div>
  );
});

PriceDisplay.displayName = 'PriceDisplay';
export default PriceDisplay;