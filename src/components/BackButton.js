import React from 'react';
import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const backButtonStyle = {
  maxWidth: '700px',
  width: '90%',
  margin: '20px auto 0 auto',
  position: 'relative',
  top: '10px',
}

// This component is used in the admin page
// to bring the user back one element
const BackButton = ({ address }) => {
  const navigate = useNavigate();
  const goBack = () => {
    navigate(address);
  }
  return (
    <div style={backButtonStyle}>
      <Button variant='outlined' onClick={goBack} aria-label='Back button'>Go Back</Button>
    </div>
  )
}

BackButton.propTypes = {
  address: PropTypes.string,
}

export default BackButton;
