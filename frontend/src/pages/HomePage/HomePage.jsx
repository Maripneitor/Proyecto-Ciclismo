import React from 'react';
import EventFinder from '../../components/HomePage/EventFinder';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.home}>
      <h1>Encuentra tu Próximo Evento de Ciclismo</h1>
      <EventFinder />
    </div>
  );
};

export default HomePage;