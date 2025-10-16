import React, { useContext } from 'react';
import { Row, Col, Spinner, Alert } from 'react-bootstrap';
import { EventContext } from '../../contexts/EventContext';
import EventCard from '../EventCard';
import styles from './FeaturedEvents.module.css';

const FeaturedEvents = () => {
    const { events, loading, error } = useContext(EventContext);
    const featured = events.slice(0, 3);

    return (
        <div className={styles.featuredContainer}>
             {loading && <div className="text-center"><Spinner animation="border" /></div>}
             {error && <Alert variant="danger">Error al cargar los eventos destacados.</Alert>}

            {!loading && !error && (
                <Row>
                    {featured.map(event => (
                        <Col key={event.id} md={4} className="mb-4">
                           <EventCard event={event} />
                        </Col>
                    ))}
                </Row>
            )}
        </div>
    );
};

export default FeaturedEvents;