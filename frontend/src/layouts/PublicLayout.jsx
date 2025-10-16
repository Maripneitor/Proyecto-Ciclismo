import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Container, Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAuth } from "../contexts/AuthContext"; // <-- LÍNEA CORREGIDA
import styles from "./PublicLayout.module.css";
import logo from "/Logo.svg";

const PublicLayout = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className={styles.layout}>
      <Navbar bg="light" expand="lg" sticky="top" className={styles.navbar}>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src={logo}
                height="30"
                className="d-inline-block align-top"
                alt="Logo"
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>Inicio</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/events">
                <Nav.Link>Eventos</Nav.Link>
              </LinkContainer>
            </Nav>
            <Nav>
              {isAuthenticated ? (
                <NavDropdown title={`Hola, ${user?.nombre || 'Usuario'}`} id="basic-nav-dropdown">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>Mi Perfil</NavDropdown.Item>
                  </LinkContainer>
                  {user?.rol === 'organizador' && (
                     <LinkContainer to="/organizer/dashboard">
                        <NavDropdown.Item>Dashboard</NavDropdown.Item>
                     </LinkContainer>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    Cerrar Sesión
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <Button variant="outline-primary" className="me-2">
                        Iniciar Sesión
                      </Button>
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <Button variant="primary">Registrarse</Button>
                    </Nav.Link>
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
    </div>
  );
};

export default PublicLayout;