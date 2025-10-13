// src/components/HomePage/Testimonials.jsx
import React from 'react';
import { Carousel, Row, Col, Image } from 'react-bootstrap';
import styles from './Testimonials.module.css';

const testimonials = [
  { id: 1, name: 'Ana Gómez', text: '¡La mejor organización que he visto! La ruta fue increíble y el ambiente inmejorable. Ya espero con ansias el próximo evento.', avatar: 'https://i.pravatar.cc/150?u=ana' },
  { id: 2, name: 'Carlos Ruiz', text: 'Gracias a esta plataforma me inicié en el ciclismo de montaña. Los eventos son perfectos tanto para novatos como para expertos.', avatar: 'https://i.pravatar.cc/150?u=carlos' },
  { id: 3, name: 'Laura Fernández', text: 'La comunidad es fantástica. He conocido a gente maravillosa y he superado mis propios límites en cada carrera. ¡Totalmente recomendado!', avatar: 'https://i.pravatar.cc/150?u=laura' },
];

const Testimonials = () => {
  return (
    <div className={styles.testimonialsSection}>
        <Row className="align-items-center">
            <Col md={7}>
                <Carousel indicators={false}>
                    {testimonials.map(item => (
                        <Carousel.Item key={item.id} className={styles.testimonialItem}>
                            <Image src={item.avatar} roundedCircle className="mb-3" />
                            <p className={styles.testimonialText}>"{item.text}"</p>
                            <footer className="blockquote-footer">{item.name}</footer>
                        </Carousel.Item>
                    ))}
                </Carousel>
            </Col>
            <Col md={5} className="text-center text-md-start">
                <h4 className="fw-bold">Únete a nuestra vibrante comunidad</h4>
                <p className="fs-1 fw-bolder text-primary">15,000+</p>
                <p className="text-muted">Ciclistas y atletas ya son parte de la familia. ¡Solo faltas tú!</p>
            </Col>
        </Row>
    </div>
  );
};

export default Testimonials;