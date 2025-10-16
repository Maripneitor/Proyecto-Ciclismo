import React from 'react';
import styles from './ButtonSport.module.css';

const ButtonSport = ({ children, onClick, type = 'button' }) => (
  <button className={styles.button} onClick={onClick} type={type}>
    {children}
  </button>
);

export default ButtonSport;