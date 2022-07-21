/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const chartStyle = {
  margin: '0px 0 40px 0',
}

// This component is used by the adminResults page to
// display the score of the top five players
const ResultBoard = ({ questions, results }) => {
  const [questionScores, setQuestionScores] = React.useState([]);
  const [playerScores, setPlayerScores] = React.useState([]);

  // This useEffect calls for scores to be listed
  React.useEffect(() => {
    console.log(questions);
    console.log(results);
    if (questions !== '') {
      listScores();
    }
  }, []);

  // This useEffect calls for the total score to be processed
  // every time the question scores are updated
  React.useEffect(() => {
    if (questionScores.length !== 0) {
      processTotalScore();
    }
  }, [questionScores]);

  // This function sets an array of scores based on the fetch request
  const listScores = () => {
    const points = [];
    questions.forEach(question => {
      if (question.pointReq === '') {
        points.push(0);
      } else {
        points.push(question.pointReq);
      }
    });
    setQuestionScores(points);
  }

  // This function finds the top 5 scores for each player
  const processTotalScore = () => {
    const scores = [];
    results.forEach((result, index) => {
      const object = {};
      const total = calculateTotal(result.answers);
      object.id = index;
      object.name = result.name;
      object.total = total;
      scores.push(object);
    });
    scores.sort(sortArray);
    const topFiveScores = scores.slice(0, 5);
    setPlayerScores(topFiveScores);
  }

  // This function calculates the total score for each player
  const calculateTotal = (answers) => {
    let total = 0;
    answers.forEach((answer, index) => {
      if (answer.correct === true) {
        total += parseInt(questionScores[index]);
      } else {
        total += 0;
      }
    });
    return total;
  }

  // This function helps sort an array into descending order
  const sortArray = (a, b) => {
    if (a.total < b.total) {
      return 1;
    }
    if (a.total > b.total) {
      return -1;
    }
    return 0;
  }

  return (
    <div id='top-scores-chart' style={chartStyle}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 300 }} aria-label="top score table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Score</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {playerScores.map((score, index) => (
              <TableRow
                key={score.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {score.name}
                </TableCell>
                <TableCell align="right">{score.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

ResultBoard.propTypes = {
  questions: PropTypes.array,
  results: PropTypes.array,
}
export default ResultBoard;
