// src/hooks/useEvents.js
import { useContext } from 'react';
import { EventContext } from '../contexts/EventContext.jsx'; // Asegúrate que la ruta a tu contexto sea correcta

export const useEvents = () => {
  const context = useContext(EventContext);
  if (context === undefined) {
    throw new Error('useEvents debe ser usado dentro de un EventProvider');
  }
  return context;
};