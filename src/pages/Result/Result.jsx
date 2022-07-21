import React from 'react';
import { GroupDiv } from '../Home/Home';
import Title from '../../components/Titles/Title';
import AdminNavBar from '../../components/Bars/AdminNavBar';
import { useParams } from 'react-router-dom';
import ScoreTable from '../../components/GamePlay/ResultBoard';
import CorrectPercentageChart from '../../components/Chart/CorrectPercentChart';
import AverageTimeChart from '../../components/Chart/AverageTimeChart';

export const subTitleStyle = {
  fontWeight: 'bold',
}

// This page gets the results of a game for an admin required by 2.3.3
const AdminResults = () => {
  const { sessionId } = useParams();
  const token = localStorage.getItem('token');
  const [questions, setQuestions] = React.useState([]);
  const [results, setResults] = React.useState([]);
  const [scoreTable, setScoreTable] = React.useState(false);
  const [percentChart, setPercentChart] = React.useState(false);
  const [averageTimeChart, setAverageTimeChart] = React.useState(false);
  const [render, setRender] = React.useState(false);

  // This function acquires the results from the backend
  const getResults = async () => {
    const req = await fetch(`http://localhost:5005/admin/session/${sessionId}/results`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    });
    if (req.ok) {
      const data = await req.json();
      console.log(data);
      setResults(data.results);
    }
  }

  // This function acquires the questions from the backend
  const getQuestions = async () => {
    const req = await fetch(`http://localhost:5005/admin/session/${sessionId}/status`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    });
    if (req.ok) {
      const data = await req.json();
      console.log(data);
      setQuestions(data.results.questions);
      setRender(true);
    }
  }

  React.useEffect(async () => {
    await getResults();
    await getQuestions();
  }, []);

  React.useEffect(async () => {
    console.log(questions);
    // Ensures that tables/charts dont render until data has been
    // collected by backend
    if (render === true) {
      setScoreTable(true);
      setPercentChart(true);
      setAverageTimeChart(true);
    }
  }, [questions, render]);

  return (
    <>
      <header>
        <nav>
          <AdminNavBar></AdminNavBar>
        </nav>
      </header>
      <main>
        <GroupDiv>
          <Title name="Admin Results Page"></Title>
          <p style={subTitleStyle}>Top 5 Scores:</p>
          { scoreTable && <ScoreTable questions={questions} results={results}/> }
          <p style={subTitleStyle}>Data Charts:</p>
          { percentChart && <CorrectPercentageChart questions={questions} results={results}/> }
          { averageTimeChart && <AverageTimeChart questions={questions} results={results} /> }
        </GroupDiv>
      </main>
    </>
  )
};

export default AdminResults;
