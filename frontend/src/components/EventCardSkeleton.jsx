// src/components/EventCardSkeleton.jsx
import React from 'react';
import { Card, Placeholder } from 'react-bootstrap';
import styles from './EventCard.module.css';

const EventCardSkeleton = () => (
  <Card className={styles.eventCard}>
    <Placeholder as={Card.Header} animation="glow">
      <Placeholder xs={12} style={{ height: '200px' }} />
    </Placeholder>
    <Card.Body>
      <Placeholder as={Card.Title} animation="glow">
        <Placeholder xs={8} />
      </Placeholder>
      <Placeholder as={Card.Text} animation="glow">
        <Placeholder xs={10} />
        <Placeholder xs={4} />
      </Placeholder>
      <div className="d-flex justify-content-between align-items-center">
        <Placeholder xs={3} />
        <Placeholder.Button variant="success" xs={4} />
      </div>
    </Card.Body>
  </Card>
);

export default EventCardSkeleton;