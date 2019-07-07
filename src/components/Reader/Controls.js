import React from 'react';
import PropTypes from 'prop-types';
import style from './Reader.module.css';

const Controls = ({ currentItem, itemsLength, onIncrement, onDicrement }) => (
  <section className={style.controls}>
    <button
      type="button"
      className={currentItem === 1 ? style.buttonDisabled : style.button}
      onClick={onIncrement}
    >
      Назад
    </button>
    <button
      type="button"
      className={
        currentItem === itemsLength ? style.buttonDisabled : style.button
      }
      onClick={onDicrement}
    >
      Вперед
    </button>
  </section>
);

Controls.propTypes = {
  currentItem: PropTypes.number.isRequired,
  itemsLength: PropTypes.number.isRequired,
  onIncrement: PropTypes.func.isRequired,
  onDicrement: PropTypes.func.isRequired,
};

export default Controls;
