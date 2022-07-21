import React from 'react';
import { useParams } from 'react-router-dom';
import { fetchGameInfo } from '../../components/GamePlay/GameFeed';
import BackButton from '../../components/Button/BackButton';
import AdminNavBar from '../../components/Bars/AdminNavBar';
import EditGame from '../../components/GamePlay/EditGame';
import QuestionFeed from '../../components/Question/QuestionFeed';

// This page allows the user to edit the game as required by 2.2.2
const editGame = () => {
  const token = localStorage.getItem('token');
  const { quizId } = useParams();
  const [questions, setQuestions] = React.useState([]);

  // This useEffect calls for questions to be acquired from the backend
  React.useEffect(async () => {
    await getQuestion(quizId, token);
  }, []);

  // This function gets the question details from the backend
  const getQuestion = async (quizId, token) => {
    setQuestions([]);
    console.log(questions);
    const gameInfo = await fetchGameInfo(quizId, token);
    setQuestions(gameInfo.questions);
  }

  return (
    <>
      <header>
        <nav>
          <AdminNavBar></AdminNavBar>
        </nav>
      </header>
      <main>
        <BackButton address={'/home'}>Hello</BackButton>
        <EditGame quizId={quizId} token={token}/>
        <QuestionFeed quizId={quizId} token={token}></QuestionFeed>
      </main>
    </>
  )
}

export default editGame;
