import React from 'react';
import QuestionPanel, { getQuestion } from '../../components/Question/QuestionPanel';
import { useParams } from 'react-router-dom';
import WaitPanel from '../../components/WaitPanel';
import AnswerPanel from '../../components/Answer/AnswerPanel';
import GameResults from '../../components/GamePlay/GameResults';
import Helmet from 'react-helmet';

// This function calculates how much time is left
const pageTime = (timeStarted, limit) => {
  const dateNow = new Date();
  const diff = limit - Math.floor((dateNow - timeStarted) / 1000);
  return diff;
}

// This page allows the user to play the game as requied by 2.4.2
const GamePage = () => {
  const { playerId } = useParams();
  const [question, setQuestion] = React.useState('');
  const [started, setStarted] = React.useState(false);
  const [questionStarted, setQuestionStarted] = React.useState('');
  const [timeStarted, setTimeStarted] = React.useState('');
  const [timer, setTimer] = React.useState(0);
  const [stopTimer, setStopTimer] = React.useState(false);
  const [sessionOver, setSessionOver] = React.useState(false);
  const [counter, setCounter] = React.useState(1);
  const [timeLimit, setTimeLimit] = React.useState(0);

  // This function checks if the game has started
  // It returns true if so or false otherwise
  const checkReady = async () => {
    const req = await fetch(`http://localhost:5005/play/${playerId}/status`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    });
    const response = await req.json();
    if (req.ok) {
      if (response.started === true) {
        setStarted(response.started);
      }
      return false;
    } else {
      setSessionOver(true);
      return true;
    }
  }

  // This useEffect continuously pages the backend until the
  // admin starts the game
  React.useEffect(async () => {
    const feedBack = await checkReady();
    // If the game has been stopped, return
    if (feedBack === true) {
      return;
    }
    const interval = setInterval(async () => {
      const feedback = await checkReady();
      if (feedback === true) {
        clearInterval(interval);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // This useEffect modifies the appropriate state variables
  // to update the page when a question has either started or ended
  React.useEffect(async () => {
    if (started === false) {
      return;
    }
    // Answer screen active
    if (questionStarted === false) {
      // Continuously page getQuestion until a new question has been recieved
      const interval = setInterval(async () => {
        const data = await getQuestion(playerId);
        // Game has been stopped
        if ('error' in data) {
          setSessionOver(true);
          clearInterval(interval);
        } else if (data.question.Id !== question.Id && questionStarted === false) {
          setTimeLimit(parseInt(data.question.timeNeeded));
          clearInterval(interval);
          setQuestion(data.question);
          setCounter(counter + 1);
          setQuestionStarted(true);
        }
      }, 1000);
      return () => clearInterval(interval);
    } else {
      // Question screen active
      const date = new Date(question.isoTimeLastQuestionStarted);
      setStopTimer(false);
      setTimeStarted(date);
    }
  }, [questionStarted]);

  // This useEffect is activated when a game begins for
  // the first time and gets the question
  React.useEffect(async () => {
    if (started === true) {
      const data = await getQuestion(playerId);
      if ('error' in data) {
        setSessionOver(true);
        return;
      }
      const date = new Date(data.question.isoTimeLastQuestionStarted);
      setQuestion(data.question);
      setTimeStarted(date);
      setTimeLimit(parseInt(data.question.timeNeeded));
      if (sessionOver === false) {
        setQuestionStarted(true);
      }
    }
  }, [started])

  // This useEffect manages the timer that alternates
  // between the question and answer panels
  React.useEffect(() => {
    if (started === true && sessionOver === false) {
      processTime();
      const interval = setInterval(() => {
        processTime();
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [timeStarted, sessionOver])

  // This useEffect turns off the question panel
  // when the timer has been stopped
  React.useEffect(() => {
    if (started === true && stopTimer === true) {
      setQuestionStarted(false);
    }
  }, [stopTimer])

  // This useEffect pulls up the game resutls
  // when the game session is over
  React.useEffect(() => {
    if (sessionOver === true) {
      setStarted(true);
      setStopTimer(false);
      setQuestionStarted(false);
    }
  }, [sessionOver])

  // This function calculates the amount of time left
  // and switches the appropriate state variables
  // when the time left has ended
  const processTime = () => {
    if (stopTimer === false) {
      const timeLeft = pageTime(timeStarted, timeLimit);
      if (timeLeft >= 0) {
        setTimer(timeLeft);
      } else {
        setStopTimer(true);
      }
    }
  }

  return (
    <>
      <Helmet bodyAttributes={{ style: 'background-color : #fafafa' }} />
      <main>
        { !started && <WaitPanel />}
        { questionStarted && <QuestionPanel playerId={playerId} timer={timer} counter={counter}/> }
        { stopTimer && <AnswerPanel playerId={playerId} stopTimer={stopTimer} counter={counter}></AnswerPanel> }
        { sessionOver && <GameResults playerId={playerId}></GameResults> }
      </main>
    </>
  )
}

export default GamePage;
