import React from 'react';
import { GroupDiv } from '../pages/dashboard';
import { fetchGameInfo } from './GameFeed';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import FullButton from './FullButton';
import Title from './Title';
import { fileToDataUrl } from './ImageConverter';
import ErrorPopup from './ErrorPopup';

const ThumbnailStyle = {
  marginTop: '12px',
  marginBottom: '20px',
}

const qStyle = {
  marginTop: '0',
  marginBottom: '5px',
  width: '100%',
}

// This component is used by the editGame page and
// allows one to edit the title and thumbnail of
// a game
const EditGame = ({ quizId, token }) => {
  const [name, setName] = React.useState('');
  const [image, setImage] = React.useState('');
  const [questions, setQuestions] = React.useState([]);
  const [popup, setPopup] = React.useState(false);
  const [descTitle, setDescTitle] = React.useState('');
  const [desc, setDesc] = React.useState('');

  // This useEffect gathers the question details for the page
  React.useEffect(() => {
    getQuestion(quizId, token);
  }, [])

  // This function allows the error popup to be activated
  const activatePopup = () => {
    setPopup(!popup);
  }

  // This function fetches the game details from the backend
  // and sets it to the states
  const getQuestion = async (quizId, token) => {
    setQuestions([]);
    const gameInfo = await fetchGameInfo(quizId, token);
    setImage(gameInfo.thumbnail);
    setQuestions(gameInfo.questions);
  }

  // This function uploads the game detail changes to the
  // backend if the name and images uploaded are valid
  const updateData = async () => {
    if (name === '') {
      setDescTitle('Error!');
      setDesc('Please enter a title for your game.');
      activatePopup();
      return;
    }
    getQuestion(quizId, token);
    let imageProcessed = '';
    if (image !== null) {
      imageProcessed = await fileToDataUrl(image);
    }
    const req = await fetch(`http://localhost:5005/admin/quiz/${quizId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        questions: questions,
        name: name,
        thumbnail: imageProcessed,
      })
    })
    if (req.ok) {
      setDescTitle('Success!');
      setDesc('Changes submitted');
      activatePopup();
    }
  }

  return (
    <GroupDiv>
      {popup && <ErrorPopup title={descTitle} desc={desc} toggle={activatePopup} />}
      <form aria-label='Edit game details'>
        <Title name="Edit game details"></Title>
        <TextField
          style={qStyle}
          onChange={e => setName(e.target.value)}
          label="Game Title"
          variant="outlined"
          aria-label='Game title field'
        />
        <div style={ThumbnailStyle}>
          <label htmlFor="image">Upload Thumbnail:</label>
          <input
            id="image"
            type="file"
            accept='image/*'
            onChange={e => setImage(e.target.files[0])}
            aria-label='Thumbnail upload'
          />
        </div>
        <FullButton text="Submit Changes" onClick={updateData} aria='Submit changes button'></FullButton>
      </form>
    </GroupDiv>
  )
}

EditGame.propTypes = {
  quizId: PropTypes.string,
  token: PropTypes.string,
}

export default EditGame;
