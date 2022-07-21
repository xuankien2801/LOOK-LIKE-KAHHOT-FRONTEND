import React from 'react';
import PropTypes from 'prop-types';

const TitleStyle = {
  margin: '25px 0 25px 0',
  color: '#FF5003',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '1.2rem',
}

// This component creates a centered subtitle for use
const CenteredTitle = ({ name }) => {
  return (
    <p style={TitleStyle}>{name}</p>
  )
}

CenteredTitle.propTypes = {
  name: PropTypes.string,
}

export default CenteredTitle;
