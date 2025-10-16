import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import EventFinder from '../../components/HomePage/EventFinder';
import FeaturedEvents from '../../components/HomePage/FeaturedEvents';
import HeroSection from '../../components/HomePage/HeroSection';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.homePage}>
        <HeroSection />
        <Container>
            <Row className="my-5" id="event-finder">
                <Col>
                    <h2 className="text-center">Encuentra tu Próximo Evento</h2>
                    <EventFinder />
                </Col>
            </Row>
            <Row className="my-5">
                <Col>
                    <h2 className="text-center">Eventos Destacados</h2>
                    <FeaturedEvents />
                </Col>
            </Row>
        </Container>
    </div>
  );
};

export default HomePage;