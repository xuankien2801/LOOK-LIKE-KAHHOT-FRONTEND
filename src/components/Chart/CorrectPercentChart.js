import React from 'react';
import PropTypes from 'prop-types';
import TestChart from './TestChart';

const chartStyle = {
  margin: '0 0 10px 0',
}

// This component is used by the adminResults page.
// It generates the data for and renders the percentage chart
const CorrectPercentageChart = ({ questions, results }) => {
  const [totalPlayers, setTotalPlayers] = React.useState(0);
  const [percentageCorrect, setPercentageCorrect] = React.useState([]);
  const [questionLabels, setQuestionLabels] = React.useState();
  const [renderChart, setRenderChart] = React.useState(false);

  // This useEffect finds and sets the total amount of players
  // to the appropriate state variable
  React.useEffect(() => {
    if (questions !== '') {
      setTotalPlayers(results.length);
    }
  }, []);

  React.useEffect(() => {
    if (totalPlayers !== 0) {
      console.log(percentageCorrect);
    }
  }, [percentageCorrect]);

  // This useEffect activates the findCorrectPerQuestion function
  React.useEffect(() => {
    console.log(totalPlayers);
    if (totalPlayers !== 0) {
      findCorrectPerQuestion();
    }
  }, [totalPlayers]);

  // This function determines how many players got each question correct
  const findCorrectPerQuestion = () => {
    const correctTally = [];
    // eslint-disable-next-line no-unused-vars
    questions.forEach(question => {
      correctTally.push(0);
    });
    results.forEach(result => {
      result.answers.forEach((answer, index) => {
        if (answer.correct === true) {
          correctTally[index] += 1;
        }
      });
    });
    calculatePercentage(correctTally);
  }

  // This function determines the percentage correct for each question
  const calculatePercentage = (correctTally) => {
    const questionStrings = [];
    const correctPercentage = [];
    correctTally.forEach((item, index) => {
      correctPercentage.push(0);
      questionStrings.push(`Q${index + 1}`);
      const percentage = Math.round((correctTally[index] / totalPlayers) * 100);
      correctPercentage[index] = percentage;
    });
    setPercentageCorrect(correctPercentage);
    setQuestionLabels(questionStrings);
    setRenderChart(true);
  }

  return (
    <div id='correct-chart' style={chartStyle}>
      {renderChart && <TestChart
                        key={percentageCorrect}
                        data={percentageCorrect}
                        labels={questionLabels}
                        title='% of Players Who Scored Correctly'
                        format='%'
                        series='Percentage of players'
                        xTitle='Question'
                        yTitle='% Correct'/>}
    </div>
  )
}

CorrectPercentageChart.propTypes = {
  questions: PropTypes.array,
  results: PropTypes.array,
}

export default CorrectPercentageChart;
