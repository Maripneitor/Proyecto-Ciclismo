// src/layouts/PublicLayout.jsx
import React from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import styles from './PublicLayout.module.css';
// CORRECCIÓN: La importación apunta a la carpeta de hooks
import { useAuth } from '../contexts/AuthContext';

const PublicLayout = () => {
  const { currentUser } = useAuth();

  return (
    <div className={styles.publicLayout}>
      <Navbar bg="light" expand="lg" className="shadow-sm" sticky="top">
        <Container>
          <Navbar.Brand as={Link} to="/" className="fw-bold d-flex align-items-center">
            <img src="/Logo.svg" alt="Ciclomex Logo" height="30" className="me-2" />
            Ciclomex
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="public-navbar-nav" />
          <Navbar.Collapse id="public-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="/" end>Inicio</Nav.Link>
              <Nav.Link as={NavLink} to="/events-list">Eventos</Nav.Link>
            </Nav>
            <Nav>
              {currentUser ? (
                <Button as={Link} to={currentUser.role === 'organizer' ? '/organizer' : '/user'} variant="success">
                  Ir a mi Panel
                </Button>
              ) : (
                <>
                  <Button as={Link} to="/login" variant="outline-primary" className="me-2">Iniciar Sesión</Button>
                  <Button as={Link} to="/register" variant="primary">Registrarse</Button>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className={styles.mainContent}>
        <Outlet />
      </main>

      <footer className={styles.footer}>
        <Container>
          <p>&copy; {new Date().getFullYear()} Ciclomex. Todos los derechos reservados.</p>
        </Container>
      </footer>
    </div>
  );
};

export default PublicLayout;

