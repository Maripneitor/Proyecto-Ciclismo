// src/pages/HomePage/HomePage_Clasico.jsx

import React from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';
import HeroSection from '../../components/HomePage/HeroSection';
import EventFinder from '../../components/HomePage/EventFinder';
import FeaturedEvents from '../../components/HomePage/FeaturedEvents';
import SportCategories from '../../components/HomePage/SportCategories';
import UserStats from '../../components/HomePage/UserStats';
import Testimonials from '../../components/HomePage/Testimonials';
import './HomePage.css'; // Usando CSS global en lugar de Módulos

class HomePage extends React.Component {
  // Para acceder al contexto en un componente de clase
  static contextType = AuthContext;

  render() {
    const { currentUser } = this.context;

    return (
      <div className="homepage-container">
        <header>
          <HeroSection />
        </header>
        
        <main>
          <Container className="main-container">
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
              <section id="user-stats" className="mb-5">
                <UserStats />
              </section>
            )}

            <section id="testimonials" className="mb-5">
              <h2 className="text-center mb-4">Lo que dice nuestra comunidad</h2>
              <Testimonials />
            </section>
          </Container>
        </main>
      </div>
    );
  }
}

export default HomePage;