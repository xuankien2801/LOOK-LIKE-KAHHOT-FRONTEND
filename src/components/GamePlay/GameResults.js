import React from 'react';
import { GroupDiv } from '../../pages/Home/Home';
import PropTypes from 'prop-types';
import Title from '../Titles/Title';

const TotalStyle = {
  fontWeight: 'bold',
  marginBottom: '5px',
}

const timeStyle = {
  marginLeft: '7px',
  marginBottom: '0',
}

// This function gets the results for the game from the backend
export const getResults = async (playerId) => {
  const req = await fetch(`http://localhost:4000/play/${playerId}/results`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  });
  const response = await req.json();
  return response;
}

// This component is used in the playGame page to
// generate the results for each player at the end
// of the game
const GameResults = ({ playerId }) => {
  const [results, setResults] = React.useState([]);
  const [totalScore, setTotalScore] = React.useState(0);
  const [times, setTimes] = React.useState([]);

  // This useEffect gets the results from the backend
  React.useEffect(async () => {
    const result = await getResults(playerId);
    setResults(result);
  }, []);

  // This useEffect calculates the total score and time spent for each question
  React.useEffect(async () => {
    let totalScore = 0;
    const times = [];
    results.forEach((result) => {
      const time = processTime(result.questionStartedAt, result.answeredAt);
      times.push(time);
      if (result.correct) {
        totalScore += 1;
      }
    })
    setTotalScore(totalScore);
    setTimes(times);
  }, [results]);

  // This function determines how much time has passed
  const processTime = (start, end) => {
    if (start === null || end === null) {
      return 0;
    }
    const startTime = new Date(start);
    const endTime = new Date(end);
    const diff = Math.round((endTime - startTime) / 1000);
    return diff;
  }

  return (
    <>
      <GroupDiv>
        <Title name="Results!"></Title>
        <p style={TotalStyle}>Total Correct: {totalScore}</p>
        {results.map((result, index) => {
          return (
            <div key={index}>
              <span>Question {index + 1}</span>
              {result.correct && <span> : Correct</span>}
              {!result.correct && <span> : Incorrect</span>}
              <p style={timeStyle}> - Time Spent : {times[index]}s</p>
            </div>
          )
        })}
      </GroupDiv>
    </>
  )
}

GameResults.propTypes = {
  playerId: PropTypes.string,
}
export default GameResults;
