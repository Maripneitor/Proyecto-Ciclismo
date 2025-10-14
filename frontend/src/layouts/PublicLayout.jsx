// ruta: frontend/src/layouts/PublicLayout.jsx

import { Outlet } from 'react-router-dom';
import { Container, Navbar, Nav, Button, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useAuth } from '../hooks/useAuth';
import styles from './PublicLayout.module.css';
import logo from '/Logo.svg'; // Asegúrate que tu logo esté en la carpeta /public

const PublicLayout = () => {
  const { user, logout } = useAuth();

  return (
    <div className={styles.publicLayout}>
      <Navbar expand="lg" className={styles.navbar} fixed="top" bg="light" variant="light">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src={logo}
                width="120"
                height="30"
                className="d-inline-block align-top"
                alt="CicloMex logo"
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>Inicio</Nav.Link>
              </LinkContainer>
              {/* Aquí puedes agregar enlaces a futuras páginas como "Eventos" o "Comunidad" */}
            </Nav>
            <Nav>
              {user ? (
                <NavDropdown title={`Hola, ${user.name || 'Usuario'}`} id="basic-nav-dropdown">
                  <LinkContainer to="/user/home">
                    <NavDropdown.Item>Mi Perfil</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/user/events">
                    <NavDropdown.Item>Mis Eventos</NavDropdown.Item>
                  </LinkContainer>
                  {user.role === 'organizer' && (
                     <LinkContainer to="/organizer/dashboard">
                        <NavDropdown.Item>Panel de Organizador</NavDropdown.Item>
                     </LinkContainer>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout}>
                    Cerrar Sesión
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Button variant="outline-primary" className="me-2 mb-2 mb-lg-0">
                      Iniciar Sesión
                    </Button>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Button variant="primary">Registrarse</Button>
                  </LinkContainer>
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
          <p>&copy; 2024 CicloMex. Todos los derechos reservados.</p>
        </Container>
      </footer>
    </div>
  );
};

export default PublicLayout;