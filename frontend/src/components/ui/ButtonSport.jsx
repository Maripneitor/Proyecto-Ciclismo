// frontend/src/components/ui/ButtonSport.jsx

import React from 'react';
import styles from './ButtonSport.module.css';

/**
 * Componente reutilizable para botones con variantes de diseño.
 * * @param {string} variant - Estilo del botón ('primary', 'secondary', 'tertiary', 'disabled', 'link').
 * @param {boolean} fullWidth - Si es verdadero, el botón ocupa todo el ancho.
 * @param {string} type - Tipo de botón (e.g., 'submit', 'button').
 * @param {object} props - Props adicionales (onClick, children, className, etc.).
 */
const ButtonSport = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  type = 'button',
  className = '',
  ...props 
}) => {
  
  // Construye las clases CSS: base + variante + ancho + clases personalizadas
  const buttonClass = [
    styles.button,
    styles[variant],
    fullWidth ? styles.fullWidth : '',
    className,
  ].join(' ').trim();

  return (
    <button
      type={type}
      className={buttonClass}
      disabled={variant === 'disabled' || props.disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonSport;