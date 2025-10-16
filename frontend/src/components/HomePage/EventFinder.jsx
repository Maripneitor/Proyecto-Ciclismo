import React, { useContext, useState } from 'react';
import { Form, Row, Col, Spinner, Alert } from 'react-bootstrap';
import { EventContext } from '../../contexts/EventContext';
import EventCard from '../EventCard';
import styles from './EventFinder.module.css';

const EventFinder = () => {
    const { events, loading, error } = useContext(EventContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({
        distance: '',
        type: '',
    });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const filteredEvents = events.filter(event => {
        return (
            event.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (filters.distance ? event.distance >= parseInt(filters.distance) : true) &&
            (filters.type ? event.type === filters.type : true)
        );
    });

    return (
        <div className={styles.finderContainer}>
            <Form className="mb-4">
                <Row className="g-2">
                    <Col md={6}>
                        <Form.Control
                            type="text"
                            placeholder="Buscar por nombre del evento..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </Col>
                    <Col md={3}>
                        <Form.Select name="distance" value={filters.distance} onChange={handleFilterChange}>
                            <option value="">Cualquier distancia</option>
                            <option value="10">10km o más</option>
                            <option value="20">20km o más</option>
                            <option value="50">50km o más</option>
                        </Form.Select>
                    </Col>
                    <Col md={3}>
                        <Form.Select name="type" value={filters.type} onChange={handleFilterChange}>
                            <option value="">Cualquier tipo</option>
                            <option value="Femenil">Femenil</option>
                            <option value="Varonil">Varonil</option>
                            <option value="Mixto">Mixto</option>
                        </Form.Select>
                    </Col>
                </Row>
            </Form>

            {loading && <div className="text-center"><Spinner animation="border" /></div>}
            {error && <Alert variant="danger">Error al cargar los eventos.</Alert>}

            {!loading && !error && (
                <Row>
                    {filteredEvents.length > 0 ? (
                        filteredEvents.map(event => (
                            <Col key={event.id} md={4} className="mb-4">
                                <EventCard event={event} />
                            </Col>
                        ))
                    ) : (
                        <p className="text-center">No se encontraron eventos con los criterios seleccionados.</p>
                    )}
                </Row>
            )}
        </div>
    );
};

export default EventFinder;