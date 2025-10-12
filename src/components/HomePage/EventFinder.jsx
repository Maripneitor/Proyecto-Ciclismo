// src/components/HomePage/EventFinder.jsx
import React, { useState } from 'react';
import { Form, Button, Row, Col, Spinner } from 'react-bootstrap';
import { useDebounce } from '../../hooks/useDebounce';
import { useSticky } from '../../hooks/useSticky';
import { useNotification } from '../../contexts/NotificationContext'; // <-- IMPORTADO
import styles from './EventFinder.module.css';

const EventFinder = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const debouncedSearchTerm = useDebounce(searchTerm, 300);
    const [finderRef, isSticky] = useSticky(400);
    const { addNotification } = useNotification(); // <-- OBTENIDO

    React.useEffect(() => {
        if (debouncedSearchTerm) {
            setLoading(true);
            const timer = setTimeout(() => setLoading(false), 1000);
            return () => clearTimeout(timer);
        }
    }, [debouncedSearchTerm]);

    const handleNearMeClick = () => {
        addNotification('Función en desarrollo: ¡Pronto podrás buscar eventos cerca de ti!', 'info');
    };
    
    return (
        <div ref={finderRef} className={`${styles.finderContainer} ${isSticky ? styles.sticky : ''}`}>
            <Row className="g-2">
                <Col md={5}>
                    <Form.Control 
                        type="text" 
                        placeholder="Buscar por nombre de evento..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </Col>
                <Col md={2}>
                    <Form.Select aria-label="Deporte">
                        <option>Ciclismo</option>
                        <option>Running</option>
                        <option>Triatlón</option>
                    </Form.Select>
                </Col>
                <Col md={2}><Form.Control type="date" /></Col>
                <Col md={3}>
                    <Button variant="info" className="w-100" onClick={handleNearMeClick}> {/* <-- ONCLICK AÑADIDO */}
                        <i className="bi bi-geo-alt-fill me-2"></i>
                        Eventos cerca de ti
                    </Button>
                </Col>
            </Row>
            {loading && (
                <div className="text-center mt-3">
                    <Spinner animation="border" variant="primary" />
                    <p>Buscando eventos...</p>
                </div>
            )}
        </div>
    );
};

export default EventFinder;