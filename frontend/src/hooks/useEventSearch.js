// src/hooks/useEventSearch.js
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useEvents } from './useEvents';
import { useDebounce } from './useDebounce';

const CACHE_KEY = 'eventSearchCache';
const HISTORY_KEY = 'eventSearchHistory';
const CACHE_EXPIRY_MS = 60 * 60 * 1000; // 1 hora

// --- Helper para la gestión del Cache ---
const getCache = (key) => {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > CACHE_EXPIRY_MS) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  } catch (error) {
    console.error("Error reading from cache:", error);
    return null;
  }
};

const setCache = (key, data) => {
  try {
    const item = { data, timestamp: Date.now() };
    localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error("Error setting cache:", error);
  }
};

// --- Hook Principal ---
export const useEventSearch = () => {
  const { events } = useEvents();
  const [filters, setFilters] = useState({
    text: '',
    category: 'all',
    date: '',
    location: '', // Simulado, ya que no hay datos de ubicación en el contexto
  });
  const [status, setStatus] = useState('idle'); // idle, loading, success, empty, error
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(HISTORY_KEY)) || [];
    } catch {
      return [];
    }
  });

  const debouncedText = useDebounce(filters.text, 300);

  const filterEvents = useCallback(() => {
    setStatus('loading');
    
    // Usar una simulación de API para demostrar el estado de carga
    setTimeout(() => {
      try {
        const cacheKey = JSON.stringify({ ...filters, text: debouncedText });
        const cachedResults = getCache(`${CACHE_KEY}_${cacheKey}`);

        if (cachedResults) {
          setResults(cachedResults);
          setStatus(cachedResults.length > 0 ? 'success' : 'empty');
          return;
        }

        let filtered = [...events];

        // 1. Filtro por texto (nombre o descripción)
        if (debouncedText) {
          filtered = filtered.filter(event =>
            event.name.toLowerCase().includes(debouncedText.toLowerCase()) ||
            event.description.toLowerCase().includes(debouncedText.toLowerCase())
          );
        }

        // 2. Filtro por categoría
        if (filters.category !== 'all') {
          filtered = filtered.filter(event => event.type.toLowerCase() === filters.category.toLowerCase());
        }

        // 3. Filtro por fecha
        if (filters.date) {
          filtered = filtered.filter(event => event.date === filters.date);
        }

        // 4. Filtro por ubicación (simulado)
        if (filters.location) {
          // Lógica de filtrado por ubicación si los datos existieran
        }
        
        setResults(filtered);
        setStatus(filtered.length > 0 ? 'success' : 'empty');
        setCache(`${CACHE_KEY}_${cacheKey}`, filtered);

        // Añadir al historial si la búsqueda es significativa
        if (debouncedText && !history.includes(debouncedText)) {
          const newHistory = [debouncedText, ...history].slice(0, 5); // Guardar los últimos 5
          setHistory(newHistory);
          localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory));
        }

      } catch (err) {
        setStatus('error');
        console.error("Search failed:", err);
      }
    }, 500); // Simular latencia de red
  }, [events, filters, debouncedText, history]);

  // Efecto para ejecutar la búsqueda cuando cambian los filtros
  useEffect(() => {
    filterEvents();
  }, [filterEvents]);

  // Efecto para las sugerencias de autocompletado
  useEffect(() => {
    if (filters.text) {
      const newSuggestions = events
        .filter(event => event.name.toLowerCase().startsWith(filters.text.toLowerCase()))
        .map(event => event.name)
        .slice(0, 5); // Limitar a 5 sugerencias
      setSuggestions(newSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [filters.text, events]);
  
  const handleFilterChange = useCallback((filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem(HISTORY_KEY);
  }, []);

  return {
    filters,
    status,
    results,
    suggestions,
    history,
    handleFilterChange,
    clearHistory
  };
};