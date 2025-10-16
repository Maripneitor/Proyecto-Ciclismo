import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { useAuth } from '../contexts/AuthContext';
import styles from './PublicLayout.module.css';

const PublicLayout = () => {
    const { currentUser, logout } = useAuth();

    return (
        <div className={styles.layout}>
            <Navbar bg="dark" variant="dark" expand="lg" sticky="top" className={styles.navbar}>
                <Container>
                    <Navbar.Brand as={Link} to="/">CicloAventuras</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                            {/* Puedes añadir más enlaces aquí */}
                        </Nav>
                        <Nav>
                            {currentUser ? (
                                <>
                                    <Nav.Link as={Link} to="/profile">Mi Perfil</Nav.Link>
                                    <Button variant="outline-light" onClick={logout}>Cerrar Sesión</Button>
                                </>
                            ) : (
                                <>
                                    <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>
                                    <Button as={Link} to="/register" variant="primary" className="ms-2">Registrarse</Button>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <main className={styles.mainContent}>
                <Outlet /> {/* Aquí se renderizarán las páginas anidadas */}
            </main>

            <footer className={styles.footer}>
                <Container>
                    <p>&copy; {new Date().getFullYear()} CicloAventuras. Todos los derechos reservados.</p>
                </Container>
            </footer>
        </div>
    );
};

export default PublicLayout;