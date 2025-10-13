// src/components/ui/BadgeSport.jsx
import React from 'react';
import styles from './BadgeSport.module.css';

const BadgeSport = ({
  children,
  variant = 'category', // category, status, promo
  className = ''
}) => {
  const variantClass = styles[variant] || styles.category;

  return (
    <span className={`${styles.badgeSport} ${variantClass} ${className}`}>
      {children}
    </span>
  );
};

export default BadgeSport;

