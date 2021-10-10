import React from 'react';
import { BRAND_NAME } from '../../utils/constants';

import styles from './index.module.scss';

const Navbar = () => (
  <nav className={styles.navbar}>
    <div className={styles.navbar__container}>
      <p className={styles.navbar__title}>{BRAND_NAME}</p>
    </div>
  </nav>
  );

export default Navbar;
