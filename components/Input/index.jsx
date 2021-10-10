/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

const Input = ({ id, onChange, placeholder, type, value }) => {
  const [ inputValue, setInputValue ] = useState(value);

  useEffect(() => {
    setInputValue(value);
  }, [ value ]);

  return (
    <div className={styles.input}>
      <input
        id={id}
        type={type}
        value={inputValue}
        className={`${styles.input__tag} ${inputValue ? styles["input-with-value"] : ''}`}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        />
      {!!placeholder && <label htmlFor={id} className={`${styles.input__label} ${inputValue ? styles['label-fixed'] : ''}`}>{placeholder}</label>}
    </div>
  );
};

Input.defaultProps = {
  value: null,
  onChange: () => true,
  placeholder: '',
  type: 'text',
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.any,
};

export default Input;
