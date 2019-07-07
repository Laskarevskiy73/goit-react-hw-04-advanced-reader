import React from 'react';
import PropTypes from 'prop-types';
import style from './Reader.module.css';

const Publication = ({ currentItem: { title, text } }) => (
  <section className={style.publication}>
    <h2>{title}</h2>
    <p>{text.slice(0, 300)}...</p>
  </section>
);

Publication.propTypes = {
  currentItem: PropTypes.shape({
    title: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

export default Publication;
