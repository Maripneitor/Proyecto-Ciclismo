// src/hooks/useDebounce.js
import { useState, useEffect } from 'react';

/**
 * Hook para retrasar la actualización de un valor (debounce).
 * Útil para no ejecutar búsquedas en cada pulsación de tecla.
 * @param {any} value - El valor a "debouncear".
 * @param {number} delay - El tiempo de retraso en milisegundos.
 * @returns {any} El valor después del retraso.
 */
export const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Actualiza el valor después del delay especificado
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Limpia el temporizador si el valor o el delay cambian
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};