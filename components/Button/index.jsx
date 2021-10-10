import React from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const Button = ({ onClick, text, className, disabled }) => (
  <button disabled={disabled} className={`${styles.button} ${className}`} type="button" onClick={onClick}>
    <span className={styles.button__text}>{text}</span>
  </button>
);

Button.defaultProps = {
  className: '',
  disabled: false,
  onClick: () => true,
  text: 'Example',
};

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string,
};

export default Button;
