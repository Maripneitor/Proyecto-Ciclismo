import React, { useContext } from 'react';
import PublicLayout from '../../layouts/PublicLayout';
import HeroSection from '../../components/HomePage/HeroSection';
import EventFinder from '../../components/HomePage/EventFinder';
import FeaturedEvents from '../../components/HomePage/FeaturedEvents';
import SportCategories from '../../components/HomePage/SportCategories';
import Testimonials from '../../components/HomePage/Testimonials';
import UserStats from '../../components/HomePage/UserStats';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './HomePage.module.css';

const HomePage = () => {
  const { isAuthenticated } = useContext(AuthContext);

  // Datos simulados para demostración
  const mockFeaturedEvents = [
    {
      id: 1,
      nombre: 'Triatlón AsTri Acapulco 2025',
      fecha: '2025-03-15',
      lugar: 'Acapulco, Gro.',
      tipoDeporte: 'Triatlón',
      precioBase: 1800,
      precioPlus: 1500,
      imagenUrl: 'https://ejemplo.com/acapulco.jpg',
      inscripcionesAbiertas: true,
    },
    // ... más eventos
  ];

  return (
    <PublicLayout>
      <div className={styles.homepage}>
        {/* Sección Héroe con Carrusel (Vista 1) */}
        <HeroSection />

        {/* Buscador de Eventos (Vista 1) */}
        <section className={styles.sectionPadding}>
          <EventFinder />
        </section>

        {/* Estadísticas de Usuario (Solo si el usuario NO ha iniciado sesión, o en un diseño específico) */}
        {!isAuthenticated && (
          <section className={styles.sectionPadding}>
            <UserStats />
          </section>
        )}

        {/* Eventos Destacados/Populares (Vista 1) */}
        <section className={styles.sectionFeatured}>
          <h2 className={styles.sectionTitle}>Estelares ⭐</h2>
          <FeaturedEvents events={mockFeaturedEvents} />
        </section>

        {/* Categorías (Seriales) (Vista 1) */}
        <section className={styles.sectionCategories}>
          <h2 className={styles.sectionTitle}>Explora por Categoría</h2>
          <SportCategories />
        </section>

        {/* Testimonios (Opcional, para completar la vista de inicio) */}
        <section className={styles.sectionPadding}>
          <h2 className={styles.sectionTitle}>La gente lo dice</h2>
          <Testimonials />
        </section>
      </div>
    </PublicLayout>
  );
};

export default HomePage;