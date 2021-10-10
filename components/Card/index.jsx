import React from 'react';
import PropTypes from 'prop-types';
import Router from 'next/router';

import styles from './index.module.scss';
import Button from '../Button';
import { POST_URL } from '../../utils/urls';

const Card = ({ todo }) => (
  <div className={styles.card}>
    <div className={styles.card__content}>
      <div style={todo.url ? { backgroundImage: `url(${todo.url})` } : null} className={styles.card__img} />
      <div className={styles.card__title}>
        <span>{todo?.title}</span>
        <Button text="View more" className={styles.card__button} onClick={() => {
          console.log("hey", Router)
          Router.push(`${POST_URL}/${todo.id}`)
          }} />
      </div>
    </div>
  </div>
);

Card.propTypes = {
  todo: PropTypes.object.isRequired
};

export default Card;
