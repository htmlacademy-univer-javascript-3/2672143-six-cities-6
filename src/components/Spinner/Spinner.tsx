import React from 'react';
import styles from './Spinner.module.css';

export const Spinner: React.FC = () => (
  <div className={styles.spinnerContainer}>
    <div className={styles.spinner}></div>
    <p className={styles.spinnerText}>Loading offers...</p>
  </div>
);
