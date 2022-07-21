import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const buttonStyles = {
  marginTop: '10px',
  width: '100%',
}

// This component is a button that is used
// by other components
const TestButton = ({ id, text = 'Button', onClick, type }) => {
  return (
    <Button id={id} style={buttonStyles} variant={type ? 'contained' : 'outlined'} onClick={onClick}>{text}</Button>
  )
}

TestButton.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.bool,
}

export default TestButton;