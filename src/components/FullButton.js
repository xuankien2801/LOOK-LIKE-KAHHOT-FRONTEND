import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const buttonStyles = {
  marginTop: '10px',
  width: '100%',
}

// This component is a button that is used
// by other components
const FullButton = ({ id, text, onClick, aria }) => {
  return (
    <Button id={id} style={buttonStyles} variant="contained" onClick={onClick} aria-label={aria}>{text}</Button>
  )
}

FullButton.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  aria: PropTypes.string,
}

export default FullButton;
