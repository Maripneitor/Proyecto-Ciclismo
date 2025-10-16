import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import styles from './HeroSection.module.css';

const HeroSection = () => {
  return (
    <div className={styles.hero}>
      <Container>
        <Row className="align-items-center text-center">
          <Col>
            <h1 className={styles.title}>Encuentra Tu Próxima Aventura Sobre Ruedas</h1>
            <p className={styles.subtitle}>
              Explora, inscríbete y compite en los mejores eventos de ciclismo del país.
            </p>
            <Link to="/events">
              <Button variant="primary" size="lg" className={styles.ctaButton}>
                Explorar Eventos
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HeroSection;