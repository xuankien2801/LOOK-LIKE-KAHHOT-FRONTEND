import React from 'react';
import PropTypes from 'prop-types';
import { GroupDiv } from '../pages/dashboard';
import QuestionContainer from './QuestionContainer';
import QuestionOptions from './QuestionOptions';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { answerStyle } from './AnswerPanel';

export const YouTubeBox = styled.div`
  width: 100%;
  margin: 20px auto;
  display: flex;
  justify-content: center;
`;

export const TimerBox = styled.div`
  text-align: center;
  
`;
export const TimerText = styled.p`
  font-weight: bold;
  font-size: 1.2rem;
`;

export const Image = styled.img`
  width: 100%;
  margin: 5px 0 10px 0;
`;

// This function gets the question details from the backend
export const getQuestion = async (playerId) => {
  const req = await fetch(`http://localhost:5005/play/${playerId}/question`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  });
  const response = await req.json();
  return response;
}

// This component is used by the playGame page to
// display the question to a player. It displays
// all of the relevent game details
const QuestionPanel = ({ playerId, timer, counter }) => {
  const [question, setQuestion] = React.useState('');
  const [options, setOptions] = React.useState([]);
  const [isMulti, setisMulti] = React.useState(false);
  const [youtube, setYouTube] = React.useState('');
  const [hasVideo, setHasVideo] = React.useState(false);
  const [image, setImage] = React.useState(false);
  const [hasImage, setHasImage] = React.useState(false);

  // This useEffect initially acquires question information from
  // the backend
  React.useEffect(() => {
    acquireQuestion();
  }, []);

  // This function gets the question details from the backend
  const acquireQuestion = async () => {
    const response = await getQuestion(playerId);
    console.log(response);
    parseQuestion(response.question);
  }

  // This function updates the state variables with the
  // details acquired from the backend
  const parseQuestion = (input) => {
    setQuestion(input.question);
    setOptions(input.options);
    setisMulti(input.isMulti);
    if (input.URL !== '') {
      setYouTube(input.URL);
      setHasVideo(true);
    }
    if (input.image !== '') {
      setImage(input.image);
      setHasImage(true);
    }
  }

  return (
    <>
      <GroupDiv>
        <QuestionContainer key={question} desc={question} counter={counter}></QuestionContainer>
        { hasVideo && <YouTubeBox aria-hidden='true'><ReactPlayer url={youtube} width='95%' aria-label='Youtube Video'></ReactPlayer></YouTubeBox> }
        { hasImage && <Image aria-hidden='true' src={image} alt='Question Image'/> }
        <TimerBox><TimerText>Timer: {timer}</TimerText></TimerBox>
        <p id='description' style={answerStyle}>Click below to select options:</p>
        <QuestionOptions options={options} isMulti={isMulti} playerId={playerId}></QuestionOptions>
      </GroupDiv>
    </>
  )
}

QuestionPanel.propTypes = {
  playerId: PropTypes.string,
  timer: PropTypes.number,
  counter: PropTypes.number,
}

export default QuestionPanel;
