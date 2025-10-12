// src/components/SmartSearch/SmartSearch.jsx
import React from 'react';
import { Form, Button, Row, Col, Spinner, Card, ListGroup, Badge } from 'react-bootstrap';
import { useEventSearch } from '../../hooks/useEventSearch';
import EventCard from '../EventCard'; // Reutilizamos el EventCard existente
import styles from './SmartSearch.module.css';

// Componentes de filtro internos para simplicidad
const CategoryFilter = ({ value, onChange }) => (
  <Form.Select name="category" value={value} onChange={e => onChange('category', e.target.value)}>
    <option value="all">Todas las Categorías</option>
    <option value="Femenil">Femenil</option>
    <option value="Varonil">Varonil</option>
    <option value="Mixto">Mixto</option>
    {/* Agrega más categorías si es necesario */}
  </Form.Select>
);

const DateFilter = ({ value, onChange }) => (
  <Form.Control type="date" name="date" value={value} onChange={e => onChange('date', e.target.value)} />
);

const SearchResults = ({ status, results }) => {
  if (status === 'loading') {
    return (
      <div className="text-center p-5">
        <Spinner animation="border" variant="success" />
        <p className="mt-2">Buscando eventos...</p>
      </div>
    );
  }
  if (status === 'error') {
    return <div className="alert alert-danger">Hubo un error al realizar la búsqueda. Por favor, intenta de nuevo.</div>;
  }
  if (status === 'empty') {
    return <div className="alert alert-info">No se encontraron eventos con esos criterios.</div>;
  }
  if (status === 'success') {
    return (
      <div className={styles.resultsGrid}>
        {results.map(event => (
          <EventCard key={event.id} event={event} onRegister={() => {}} isRegistered={false} />
        ))}
      </div>
    );
  }
  return null; // Estado 'idle'
};

const SmartSearch = () => {
  const { filters, status, results, suggestions, history, handleFilterChange, clearHistory } = useEventSearch();

  return (
    <div className={styles.smartSearchContainer}>
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          {/* --- Barra de Búsqueda y Sugerencias --- */}
          <div className="position-relative">
            <Form.Control
              type="text"
              placeholder="Busca por nombre, descripción..."
              value={filters.text}
              onChange={e => handleFilterChange('text', e.target.value)}
              className="mb-1"
            />
            {suggestions.length > 0 && (
              <ListGroup className={styles.suggestionsList}>
                {suggestions.map((suggestion, index) => (
                  <ListGroup.Item key={index} action onClick={() => handleFilterChange('text', suggestion)}>
                    {suggestion}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            )}
          </div>
          
          {/* --- Filtros Avanzados --- */}
          <Row className="g-2 mt-2">
            <Col md={6}><CategoryFilter value={filters.category} onChange={handleFilterChange} /></Col>
            <Col md={6}><DateFilter value={filters.date} onChange={handleFilterChange} /></Col>
          </Row>
        </Card.Body>
      </Card>
      
      {/* --- Historial de Búsqueda --- */}
      {history.length > 0 && (
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h5 className="mb-0">Búsquedas Recientes</h5>
            <Button variant="link" size="sm" onClick={clearHistory}>Limpiar</Button>
          </div>
          <div>
            {history.map((term, index) => (
              <Badge
                key={index}
                pill
                bg="light"
                text="dark"
                className={styles.historyBadge}
                onClick={() => handleFilterChange('text', term)}
              >
                {term}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* --- Resultados --- */}
      <div>
        <h3>Resultados</h3>
        <hr />
        <SearchResults status={status} results={results} />
      </div>
    </div>
  );
};

export default SmartSearch;