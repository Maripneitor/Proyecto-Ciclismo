// src/contexts/EventContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// Datos iniciales que se usarán solo la primera vez o si localStorage está vacío
const initialEvents = [
    { id: 1, name: 'Carrera del Bosque', date: '2025-10-10', description: 'Una carrera escénica a través del bosque.', distance: 10, type: 'Femenil' },
    { id: 2, name: 'Reto de Montaña', date: '2025-11-05', description: 'Conquista las cimas más altas.', distance: 25, type: 'Varonil' },
    { id: 3, name: 'Tour de la Ciudad', date: '2025-11-20', description: 'Recorre los puntos más icónicos.', distance: 15, type: 'Mixto' }
];

const EventContext = createContext();

export const useEvents = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
    // Al iniciar, intenta cargar los eventos desde localStorage
    const [events, setEvents] = useState(() => {
        try {
            const localEvents = localStorage.getItem('events');
            return localEvents ? JSON.parse(localEvents) : initialEvents;
        } catch (error) {
            console.error("Error al leer los eventos de localStorage", error);
            return initialEvents;
        }
    });

    // Guarda los eventos en localStorage cada vez que cambien
    useEffect(() => {
        localStorage.setItem('events', JSON.stringify(events));
    }, [events]);

    const addEvent = (event) => {
        const newEvent = { ...event, id: Date.now() };
        setEvents(prevEvents => [...prevEvents, newEvent]);
    };

    const updateEvent = (updatedEvent) => {
        setEvents(prevEvents => prevEvents.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    };

    const deleteEvent = (eventId) => {
        setEvents(prevEvents => prevEvents.filter(event => event.id !== eventId));
    };

    const value = {
        events,
        addEvent,
        updateEvent,
        deleteEvent
    };

    return (
        <EventContext.Provider value={value}>
            {children}
        </EventContext.Provider>
    );
};