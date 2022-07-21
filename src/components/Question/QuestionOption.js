import React from 'react';
import PropTypes from 'prop-types';
import { Button, Checkbox } from '@mui/material';
import styled from 'styled-components';
import { labelStyle } from '../Answer/AnswerOption';

const optionStyle = {
  width: '100%',
}

export const OptionDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
`;

// This component is used by the QuestionPanel component
// to display the answer options available. The user is then
// able to submit answers to the backend by clicking on
// the options
const QuestionOptions = ({ options, isMulti, playerId }) => {
  const [checkBoxs, setCheckBoxs] = React.useState([false, false, false, false, false, false]);
  const [selectedAnswers, setSelectedAnswers] = React.useState([]);
  const [answerChanged, setAnswerChanged] = React.useState(false);

  // This useEffect allows answers to be submitted to the
  // backend everytime the user selects a new answer
  React.useEffect(() => {
    if (selectedAnswers.length !== 0) {
      submitAnswer();
    }
  }, [answerChanged]);

  // This function activates the checkboxes when a player
  // clicks on an answer
  const selectCheckBox = (index) => {
    setAnswerChanged(!answerChanged);
    let newCheckBoxs = [...checkBoxs];
    const original = newCheckBoxs[index];
    if (!isMulti) {
      newCheckBoxs = [false, false, false, false, false, false];
    }
    newCheckBoxs[index] = !original;
    setCheckBoxs(newCheckBoxs);
    if (!original) {
      addAnswers(index);
    } else {
      removeAnswers(index);
    }
  }

  // This function adds a new answer to the player's
  // currently selected answers
  const addAnswers = (index) => {
    console.log(index);
    let newAnswers = [...selectedAnswers];
    if (!isMulti) {
      newAnswers = [];
      newAnswers.push(index);
    } else {
      if (!newAnswers.includes(index)) {
        newAnswers.push(index);
      }
    }
    setSelectedAnswers(newAnswers);
  }

  // This function removes an answer from the player's
  // currently selected answers
  const removeAnswers = (index) => {
    let newAnswers = [...selectedAnswers];
    if (!isMulti) {
      newAnswers = [];
    } else {
      const i = newAnswers.indexOf(index);
      newAnswers.splice(i, 1);
    }
    setSelectedAnswers(newAnswers);
  }

  // This function submits the player's choices to the
  // backend
  const submitAnswer = async () => {
    await fetch(`http://localhost:4000/play/${playerId}/answer`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        answerIds: selectedAnswers,
      })
    });
  }

  return (
    <>
      {options.map((option, index) => {
        return (
          <OptionDiv key={index}>
            <Button variant='contained' style={optionStyle} aria-label='Option button' onClick={() => selectCheckBox(index)}>{option.answer}</Button>
            <label htmlFor={`selected${index}`} style={labelStyle}>Selected:</label>
            <Checkbox id={`selected${index}`} aria-label='Selected option checkbox indicator' checked={checkBoxs[index]}></Checkbox>
          </OptionDiv>
        )
      })}
    </>
  )
}

QuestionOptions.propTypes = {
  options: PropTypes.array,
  isMulti: PropTypes.bool,
  playerId: PropTypes.string,
}

export default QuestionOptions;