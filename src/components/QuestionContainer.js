import React from 'react';
import PropTypes from 'prop-types';

const divStyle = {
  backgroundColor: '#FF8E00',
  padding: '20px',
  borderRadius: '8px',
  marginBottom: '15px',
  display: 'flex',
  textAlign: 'center',
  justifyContent: 'center',
  alignContent: 'center',
  flexDirection: 'column',
}

// This component is used by the QuestionFeed and AnswerPanel components
// to store the question that is asked
const QuestionContainer = ({ desc, counter }) => {
  return (
    <div style={divStyle}>
      <h3>Q{counter}: {desc}</h3>
    </div>
  )
}

QuestionContainer.propTypes = {
  desc: PropTypes.string,
  counter: PropTypes.number,
}

export default QuestionContainer;
