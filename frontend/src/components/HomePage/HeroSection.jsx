import React from 'react';
import { Container, Button } from 'react-bootstrap';
import styles from './HeroSection.module.css';

const HeroSection = () => {
    return (
        <div className={styles.hero}>
            <Container className="text-center text-white">
                <h1>El Ciclismo Nos Une</h1>
                <p className="lead">
                    Descubre, participa y comparte tu pasión por el ciclismo.
                </p>
                <Button variant="primary" size="lg" href="#event-finder">
                    ¡Encuentra tu carrera!
                </Button>
            </Container>
        </div>
    );
};

export default HeroSection;