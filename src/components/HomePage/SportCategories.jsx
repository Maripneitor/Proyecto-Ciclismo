// src/components/HomePage/SportCategories.jsx
import React from 'react';
import { Row, Col } from 'react-bootstrap';
import styles from './SportCategories.module.css';

const categories = [
  { name: 'Ciclismo', icon: 'bi-bicycle', img: 'https://picsum.photos/seed/cycling/400/400' },
  { name: 'Carrera', icon: 'bi-person-running', img: 'https://picsum.photos/seed/running/400/400' },
  { name: 'Triatlón', icon: 'bi-water', img: 'https://picsum.photos/seed/triathlon/400/400' },
  { name: 'Obstáculos', icon: 'bi-barricade-fill', img: 'https://picsum.photos/seed/obstacles/400/400' },
  { name: 'Senderismo', icon: 'bi-image-alt', img: 'https://picsum.photos/seed/hiking/400/400' },
  { name: 'Natación', icon: 'bi-tsunami', img: 'https://picsum.photos/seed/swimming/400/400' },
];

const SportCategories = () => {
  return (
    <Row>
      {categories.map(cat => (
        <Col xs={6} md={4} lg={2} key={cat.name} className="mb-4">
          <div className={styles.categoryCard} style={{ backgroundImage: `url(${cat.img})` }}>
            <div className={styles.overlay}>
              <i className={`bi ${cat.icon} ${styles.icon}`}></i>
              <h5 className={styles.title}>{cat.name}</h5>
            </div>
          </div>
        </Col>
      ))}
    </Row>
  );
};

export default SportCategories;