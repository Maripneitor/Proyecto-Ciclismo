import React from 'react';
import { Card, Placeholder } from 'react-bootstrap';

const EventCardSkeleton = () => {
  return (
    <Card style={{ borderRadius: '15px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
      <Card.Body>
        <Placeholder as={Card.Title} animation="glow">
          <Placeholder xs={8} />
        </Placeholder>
        <Placeholder as={Card.Subtitle} animation="glow">
          <Placeholder xs={5} />
        </Placeholder>
        <Placeholder as={Card.Text} animation="glow">
          <Placeholder xs={11} />
          <Placeholder xs={10} />
          <Placeholder xs={7} />
        </Placeholder>
        <Placeholder.Button variant="primary" xs={12} />
      </Card.Body>
    </Card>
  );
};

export default EventCardSkeleton;