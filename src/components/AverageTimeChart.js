import React from 'react';
import PropTypes from 'prop-types';
import TestChart from './TestChart';

// This component is used by the adminResults page.
// It generates the data for and renders the average
// time chart.
const AverageTimeChart = ({ questions, results }) => {
  const [totalPlayers, setTotalPlayers] = React.useState(0);
  const [averageTimes, setAverageTimes] = React.useState([]);
  const [timeLabels, setTimeLabels] = React.useState([]);

  // This useEffect sets the totalPlayers state variable
  React.useEffect(() => {
    if (questions !== '') {
      setTotalPlayers(results.length);
    }
  }, []);

  // This useEffect starts the process of finding the average times
  React.useEffect(() => {
    if (totalPlayers !== 0) {
      findAverageTimes();
    }
  }, [totalPlayers]);

  // This function calculates the average times for each question
  const findAverageTimes = () => {
    const times = [];
    const sumTimes = [];
    const labels = [];
    questions.forEach((question, index) => {
      times.push(0);
      sumTimes.push(0);
      labels.push(`Q${index + 1}`);
    });
    results.forEach(result => {
      calculateTime(result.answers, sumTimes);
    });
    times.forEach((time, index) => {
      times[index] = Math.round(sumTimes[index] / totalPlayers);
    });
    setAverageTimes(times);
    setTimeLabels(labels);
  }

  // This function calculates the time
  const calculateTime = (questions, array) => {
    questions.forEach((question, index) => {
      const startTime = new Date(question.questionStartedAt);
      const endTime = new Date(question.answeredAt);
      const diff = (endTime - startTime) / 1000;
      array[index] += diff;
    });
  }

  return (
    <div id='time-chart'>
      <TestChart
        key={averageTimes}
        data={averageTimes}
        labels={timeLabels}
        title='Average Time Spent Per Question'
        format='s'
        series='Number of seconds'
        xTitle='Question'
        yTitle='Seconds Spent (s)'></TestChart>
    </div>
  )
}

AverageTimeChart.propTypes = {
  questions: PropTypes.array,
  results: PropTypes.array,
}

export default AverageTimeChart;
