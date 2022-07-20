import React from 'react';
import { GroupDiv } from '../pages/dashboard';
import { getQuestion } from './QuestionPanel';
import PropTypes from 'prop-types';
import QuestionContainer from './QuestionContainer';
import AnswerOptions from './AnswerOptions';
import CenteredTitle from './CenteredTitle';

export const answerStyle = {
  marginTop: '15px',
  marginBottom: '0',
  fontWeight: 'bold',
}

const waitStyle = {
  marginTop: '25px',
  marginBottom: '0',
  textAlign: 'center',
}

// This component is used by the playGame page
// It forms the panel for the answers
const AnswerPanel = ({ playerId, counter }) => {
  const [question, setQuestion] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const [answerIds, setAnswerIds] = React.useState([]);
  React.useEffect(async () => {
    await initializeData();
  }, []);

  // This function gets the question information then
  // sets it to the appropriate state
  const initializeData = async () => {
    const req = await getQuestion(playerId);
    console.log(req);
    if ('error' in req) {
      return;
    }
    if (req !== undefined) {
      setQuestion(req.question.question);
      setOptions(req.question.options);
      await getAnswer();
    }
  }

  // This function fetches the answers and passes it to
  // answerIds
  const getAnswer = async () => {
    const req = await fetch(`http://localhost:5005/play/${playerId}/answer`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
    const response = await req.json();
    setAnswerIds(response.answerIds);
  }

  return (
    <>
      <GroupDiv>
        <QuestionContainer desc={question} counter={counter}></QuestionContainer>
        <CenteredTitle name="Times Up!"></CenteredTitle>
        <p style={answerStyle}>Correct Answers:</p>
        <AnswerOptions key={answerIds} options={options} answerIds={answerIds}></AnswerOptions>
        <p style={waitStyle}>Waiting for the next question...</p>
      </GroupDiv>
    </>
  )
}

AnswerPanel.propTypes = {
  playerId: PropTypes.string,
  counter: PropTypes.number,
}

export default AnswerPanel;
