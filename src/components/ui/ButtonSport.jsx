// src/components/ui/ButtonSport.jsx
import React from 'react';
import { Spinner } from 'react-bootstrap';
import styles from './ButtonSport.module.css';

const ButtonSport = ({
  children,
  onClick,
  variant = 'primary', // primary, secondary, outline
  isLoading = false,
  className = '',
  ...props
}) => {
  const variantClass = styles[variant] || styles.primary;

  return (
    <button
      className={`${styles.btnSport} ${variantClass} ${className}`}
      onClick={onClick}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="visually-hidden">Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default ButtonSport;

