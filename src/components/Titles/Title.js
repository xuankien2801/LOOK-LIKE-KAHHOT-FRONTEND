import React from 'react';
import PropTypes from 'prop-types';

const TitleStyle = {
  margin: '5px 0 25px 0',
  color: '#FF5003',
}

// This component is used by other components as a heading title
const Title = ({ name }) => {
  return (
    <h2 style={TitleStyle}>{name}</h2>
  )
}

Title.propTypes = {
  name: PropTypes.string,
}

export default Title;
