// src/pages/DesignSystemShowcase.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import ButtonSport from '../components/ui/ButtonSport';
import BadgeSport from '../components/ui/BadgeSport';
import SearchInput from '../components/ui/SearchInput';
import CardEvent from '../components/ui/CardEvent';

const dummyEvent = { 
  id: 1, 
  name: 'Gran Carrera de Montaña', 
  date: '2025-11-15', 
  description: 'Un desafío épico a través de senderos boscosos y cimas espectaculares. ¡Prepárate para la aventura!', 
  type: 'Varonil' 
};

const DesignSystemShowcase = () => {
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState('grid');

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <Container className="my-5">
      <header className="text-center mb-5 fade-in-up">
        <h1 style={{ fontFamily: 'var(--font-heading-sport)'}}>Design System Showcase</h1>
        <p style={{ fontFamily: 'var(--font-body-readable)'}}>Reusable components for Ciclomex.</p>
      </header>

      {/* --- BOTONES --- */}
      <section className="mb-5 p-4 bg-light rounded fade-in-up" style={{ animationDelay: '0.2s' }}>
        <h2 className="mb-3">ButtonSport</h2>
        <div className="d-flex flex-wrap gap-3 align-items-center">
          <ButtonSport>Primary</ButtonSport>
          <ButtonSport variant="secondary">Secondary</ButtonSport>
          <ButtonSport variant="outline">Outline</ButtonSport>
          <ButtonSport isLoading={true}>Loading...</ButtonSport>
        </div>
      </section>

      {/* --- BADGES Y SEARCH --- */}
      <Row className="mb-5">
        <Col md={6} className="fade-in-up" style={{ animationDelay: '0.4s' }}>
            <section className="p-4 bg-light rounded h-100">
                <h2 className="mb-3">BadgeSport</h2>
                <div className="d-flex flex-wrap gap-3">
                    <BadgeSport>Category</BadgeSport>
                    <BadgeSport variant="status">Upcoming</BadgeSport>
                    <BadgeSport variant="promo">SALE</BadgeSport>
                </div>
            </section>
        </Col>
        <Col md={6} className="fade-in-up" style={{ animationDelay: '0.5s' }}>
            <section className="p-4 bg-light rounded h-100">
                <h2 className="mb-3">SearchInput</h2>
                <SearchInput
                    value={searchValue}
                    onChange={handleSearch}
                    onClear={() => setSearchValue('')}
                    isLoading={isLoading}
                />
            </section>
        </Col>
      </Row>

      {/* --- TARJETAS DE EVENTO --- */}
      <section className="fade-in-up" style={{ animationDelay: '0.6s' }}>
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>CardEvent</h2>
            <Form.Check 
                type="switch"
                id="view-mode-switch"
                label={viewMode === 'grid' ? 'Grid View' : 'List View'}
                checked={viewMode === 'list'}
                onChange={() => setViewMode(prev => prev === 'grid' ? 'list' : 'grid')}
            />
        </div>
        <CardEvent event={dummyEvent} viewMode={viewMode} />
        {viewMode === 'grid' && (
            <Row className="mt-4">
                <Col md={6} lg={4}>
                    <CardEvent event={{...dummyEvent, id: 2, type: 'Femenil'}} viewMode={viewMode} />
                </Col>
                 <Col md={6} lg={4}>
                    <CardEvent event={{...dummyEvent, id: 3, type: 'Mixto'}} viewMode={viewMode} />
                </Col>
            </Row>
        )}
      </section>

    </Container>
  );
};

export default DesignSystemShowcase;

