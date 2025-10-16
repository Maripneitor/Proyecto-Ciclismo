import React, { createContext, useState, useEffect, useContext } from 'react';
import apiClient from '../services/api';

export const EventContext = createContext();

export const useEvents = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get('/events');
                setEvents(response.data);
                setError(null);
            } catch (err) {
                console.error("Error al obtener los eventos del backend:", err);
                setError("No se pudieron cargar los eventos. Inténtalo de nuevo más tarde.");
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const addEvent = async (eventData) => {
        try {
            const response = await apiClient.post('/events', eventData);
            setEvents(prevEvents => [...prevEvents, response.data]);
            return response.data;
        } catch (error) {
            console.error("Error al crear el evento:", error);
            throw error;
        }
    };

    const getEventById = (eventId) => {
        return events.find(event => event.id.toString() === eventId.toString());
    };

    const value = {
        events,
        loading,
        error,
        addEvent,
        getEventById,
    };

    return (
        <EventContext.Provider value={value}>
            {children}
        </EventContext.Provider>
    );
};