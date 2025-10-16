import React from 'react';
import HeroSection from '../../components/HomePage/HeroSection';
import FeaturedEvents from '../../components/HomePage/FeaturedEvents';
import styles from './HomePage.module.css';

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <HeroSection />
      <FeaturedEvents />
      {/* Aquí puedes agregar más secciones en el futuro */}
    </div>
  );
};

export default HomePage;