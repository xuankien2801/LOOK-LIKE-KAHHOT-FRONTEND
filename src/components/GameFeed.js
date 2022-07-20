import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import GamePopup from './GameStartPopup';
import { Button, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Title from './Title';
import styled from 'styled-components';
import ErrorPopup from './ErrorPopup';

export const fetchGameInfo = async (quizId, token) => {
  const req = await fetch(`http://localhost:5005/admin/quiz/${quizId}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: token,
    },
  })
  const gameInfo = await req.json();
  return gameInfo;
}

export const Thumbnail = styled.img`
  width: 100%;
  margin: 5px 0 10px 0;
`;

// This component is used in the dashboard and generates
// a feed of all of the games
const GameFeed = ({ click }) => {
  const token = localStorage.getItem('token');
  const [games, setGames] = React.useState([]);
  const [popup, setPopup] = React.useState(false);
  const [popup2, setPopup2] = React.useState(false);
  const [sessionId, setSessionId] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [descTitle, setDescTitle] = React.useState('');
  const [isStart, setIsStart] = React.useState(true);
  const [quizId, setQuizId] = React.useState('');
  const navigate = useNavigate();

  // This useEffect calls for games to be fetched
  // and processed every time a click is executed
  React.useEffect(() => {
    fetchGames();
  }, [click]);

  // This function gets the quiz data for a game from the backend
  const fetchGames = async () => {
    const req = await fetch('http://localhost:5005/admin/quiz', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    })
    const games = await req.json();
    await processGames(games.quizzes);
  }

  // This function updates the game state with
  // makes a certain game active
  const updateButton = (quizId, sId) => {
    const updateGames = [...games];
    for (const game of updateGames) {
      if (game.id === quizId) {
        game.active = sId;
      }
    }
    setGames(updateGames);
  }

  // This function attempts to start a game by
  // calling the backend
  const startGame = async (quizId) => {
    const req = await fetch(`http://localhost:5005/admin/quiz/${quizId}/start`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    })
    if (req.ok) {
      // console.log(quizId);
      const info = await fetchGameInfo(quizId, token);
      setSessionId(info.active.toString());
      setDesc('The session ID for the game is: ');
      setDescTitle('Game Started!');
      setIsStart(true);
      activatePopup();
      updateButton(quizId, info.active);
    }
  }

  // This function attemps to advance a game by
  // calling the backend
  const advanceGame = async (quizId) => {
    const req = await fetch(`http://localhost:5005/admin/quiz/${quizId}/advance`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    })
    if (req.ok) {
      setDescTitle('Game Advanced!');
      setDesc('Game has successfully moved forward one question.');
      activatePopup2();
    } else {
      // Game over
      haltGame(quizId, 'Game Over!');
    }
  }

  // This function attempts to stop a game by
  // calling the backend
  const stopGame = async (quizId) => {
    await fetch(`http://localhost:5005/admin/quiz/${quizId}/end`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    })
    haltGame(quizId, 'Game Stopped!');
  }

  // This function executes the state changes needed
  // to halt a game
  const haltGame = (quizId, title) => {
    setQuizId(quizId);
    setDesc('Would you like to view the results?');
    setDescTitle(title);
    setIsStart(false);
    activatePopup();
    updateButton(quizId, null);
  }

  // This function attempts to delete a game by
  // calling the backend
  const deleteGame = async (quizId) => {
    const req = await fetch(`http://localhost:5005/admin/quiz/${quizId}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
    })
    if (req.ok) {
      const newGames = [...games];
      newGames.forEach((game, index) => {
        if (game.id === quizId) {
          newGames.splice(index, 1);
        }
      })
      setGames(newGames);
    }
  }

  // This function is used to call the popup
  const activatePopup = () => {
    setPopup(!popup);
  }

  // This function is used to call the secondary popup
  const activatePopup2 = () => {
    setPopup2(!popup2);
  }

  // This function updates the info state with the
  // relevent details of each game
  const processGames = async (list) => {
    const newGames = [];
    if (list) {
      for (const game of list) {
        const info = await fetchGameInfo(game.id, token);
        const totalTime = calculateTotalTime(info.questions);
        info.totalTime = totalTime;
        info.number = info.questions.length;
        info.id = game.id;
        newGames.push(info);
      }
      setGames(newGames);
    }
  }

  // This function calculates the total time that
  // each game will take
  const calculateTotalTime = (questions) => {
    let sum = 0;
    questions.forEach(question => {
      sum += parseInt(question.timeNeeded);
    });
    return sum;
  }

  // This function navigates to the editGame page
  const navEdit = (num) => {
    navigate(`/edit/game/${num}`)
  }

  const eleStyle = {
    backgroundColor: '#fafafa',
    margin: '20px 10px 20px 10px',
    img: '80%',
    padding: '10px',
    borderRadius: '8px',
  }

  const buttonDiv = {
    display: 'flex',
    justifyContent: 'space-between',
  }

  const textStyle = {
    lineHeight: '1.5',
    marginBottom: '5px',
    marginTop: '5px',
  }

  const gameTitleStyle = {
    marginBottom: '15px',
    position: 'relative',
    top: '7px',
    color: '#003366'
  }

  const titleDiv = {
    display: 'flex',
    justifyContent: 'space-between',
  }

  return (
    <div>
      <Title name="Available Games"></Title>
      {popup && <GamePopup title={descTitle} desc={desc} toggle={activatePopup} sessionId={sessionId} isStart={isStart} quizId={quizId}/>}
      {popup2 && <ErrorPopup title={descTitle} desc={desc} toggle={activatePopup2}/>}
      <div id="games-container">
        {games.map((game) => {
          return (
            <div key={game.id} className='game' style={eleStyle}>
              <div style={titleDiv}>
                <h3 style={gameTitleStyle} className='game-name'>{game.name}</h3>
                {game.active === null && <IconButton onClick={() => navEdit(game.id)} aria-label="Edit Button"><EditIcon>Edit</EditIcon></IconButton>}
              </div>
                {game.thumbnail !== null && <Thumbnail alt="Game Thumbnail" src={game.thumbnail}></Thumbnail>}
              <p style={textStyle}>Questions: {game.number}</p>
              <p>Total game time: {game.totalTime} seconds</p>
              <div style={buttonDiv}>
                {game.active === null && <Button variant="contained" aria-label='start game button' className='start-button' onClick={() => startGame(game.id)}>Start</Button>}
                {game.active === null && <Button variant="contained" aria-label='delete game button' className='delete-button' color="error" onClick={() => deleteGame(game.id)}>Delete </Button>}
                {game.active !== null && <Button variant="contained" aria-label='advance game button' onClick={() => advanceGame(game.id)}>Advance</Button>}
                {game.active !== null && <Button variant="contained" aria-label='stop game button' className='stop-button' color="error" onClick={() => stopGame(game.id)}>Stop Game</Button>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}

export default GameFeed;
GameFeed.propTypes = {
  click: PropTypes.bool,
}
