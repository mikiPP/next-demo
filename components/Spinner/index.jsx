import React from 'react';
import styles from './index.module.scss';

const Spinner = () => (
  <div className={styles.spinner}>
    <div className={styles.spinner__outer} />
    <div className={styles.spinner__middle} />
    <div className={styles.spinner__inner} />
    <div className={styles.spinner__center} />
  </div>
);

export default Spinner;
