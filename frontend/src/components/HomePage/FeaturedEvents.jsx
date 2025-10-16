// src/components/HomePage/FeaturedEvents.jsx
import React, { useContext } from 'react';
import { Row, Col, Placeholder, Card } from 'react-bootstrap';
import { EventContext } from '../../contexts/EventContext';
//  <-- 1. Importa el componente EventCard principal
import EventCard from '../EventCard';

const FeaturedEvents = () => {
  const { events } = useContext(EventContext);

  if (!events || events.length === 0) {
      return (
          <Row>
              {[...Array(3)].map((_, i) => (
                  <Col md={6} lg={4} key={i} className="mb-4">
                      <Card>
                        <Placeholder as={Card.Body} animation="glow">
                          <Placeholder xs={12} style={{height: '150px'}} />
                          <Placeholder xs={6} /> <Placeholder xs={8} />
                        </Placeholder>
                      </Card>
                  </Col>
              ))}
          </Row>
      );
  }

  return (
    <Row>
      {events.map(event => (
        <Col md={6} lg={4} key={event.id} className="mb-4">
            {/* 2. Usa el componente EventCard importado */}
            <EventCard event={event} />
        </Col>
      ))}
    </Row>
  );
};

export default FeaturedEvents;