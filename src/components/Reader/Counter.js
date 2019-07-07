import React from 'react';
import PropTypes from 'prop-types';
import style from './Reader.module.css';

const Counter = ({ currentItem, itemsLength }) => (
  <p className={style.counter}>
    {currentItem}/{itemsLength}
  </p>
);

Counter.propTypes = {
  currentItem: PropTypes.number.isRequired,
  itemsLength: PropTypes.number.isRequired,
};

export default Counter;
