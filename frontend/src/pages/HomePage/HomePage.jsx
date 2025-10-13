// src/pages/HomePage/HomePage.jsx
import React, { Suspense, lazy } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import HeroSection from '../../components/HomePage/HeroSection';
import EventFinder from '../../components/HomePage/EventFinder';
import FeaturedEvents from '../../components/HomePage/FeaturedEvents';
import SportCategories from '../../components/HomePage/SportCategories';
import { useAuth } from '../../hooks/useAuth'; // <-- CORRECCIÓN AQUÍ
import styles from './HomePage.module.css';

// Carga diferida para componentes que no son críticos en el primer render
const UserStats = lazy(() => import('../../components/HomePage/UserStats'));
const Testimonials = lazy(() => import('../../components/HomePage/Testimonials'));

const LoadingFallback = () => (
    <div className="text-center p-5">
        <Spinner animation="grow" variant="primary" />
    </div>
);

const HomePage = () => {
  const { currentUser } = useAuth();

  return (
    <div className={styles.homePage}>
      <header>
        <HeroSection />
      </header>
      
      <main>
        <Container className={styles.mainContainer}>
          <section id="event-finder" className="mb-5">
            <EventFinder />
          </section>

          <section id="featured-events" className="mb-5">
            <h2 className="text-center mb-4">Eventos Destacados</h2>
            <FeaturedEvents />
          </section>

          <section id="categories" className="mb-5">
            <h2 className="text-center mb-4">Explora por Deporte</h2>
            <SportCategories />
          </section>
          
          {/* Sección condicional para usuarios logueados */}
          {currentUser && (
            <Suspense fallback={<LoadingFallback />}>
              <section id="user-stats" className="mb-5">
                <UserStats />
              </section>
            </Suspense>
          )}

          <Suspense fallback={<LoadingFallback />}>
            <section id="testimonials" className="mb-5">
              <h2 className="text-center mb-4">Lo que dice nuestra comunidad</h2>
              <Testimonials />
            </section>
          </Suspense>

        </Container>
      </main>
    </div>
  );
};

export default HomePage;