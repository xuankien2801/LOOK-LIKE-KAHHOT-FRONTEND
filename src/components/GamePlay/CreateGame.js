import React from 'react';
import { GroupDiv } from '../../pages/Home/Home';
import Title from '../Titles/Title';
import PropTypes from 'prop-types';

const formStyle = {
  margin: '20px auto 10px auto',
}
const buttonStyle = {
  width: '100%',
}

// This component is used to create a new game on the
// game dashboard
const CreateGame = ({ activatePopup, activateClicked, setDesc, changed, setChanged }) => {
  const [name, setName] = React.useState('');
  const token = localStorage.getItem('token');

  // This function checks that the data is valid
  // then changes sends it to the backend to
  // create a new game
  const submit = async () => {
    if (name === '') {
      setDesc('Please enter a name');
      activatePopup();
      return;
    }

    activateClicked();
    const req = await fetch('http://localhost:4000/admin/quiz/new', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        Authorization: token,
      },
      body: JSON.stringify({
        name: name,
      })
    });
    const response = await req.json()
    if (!req.ok) {
      setDesc(response.error);
      setDesc(token);
      activatePopup();
    } else {
      setChanged(!changed);
    }
  }

  return (
    <GroupDiv>
      <Title name="Create a game!"></Title>
      <form aria-label='Create game form'>
        <input id='game-title' type="text" className="form-control" placeholder="Enter game name..." aria-label='Edit game title field' style={formStyle} onChange={e => setName(e.target.value)}></input>
      </form>
      <button id='create-game-button' className='btn btn-primary' aria-label='Create new game field' style={buttonStyle} onClick={submit}>Create New Game</button>
    </GroupDiv>
  )
}

CreateGame.propTypes = {
  activatePopup: PropTypes.func,
  activateClicked: PropTypes.func,
  setDesc: PropTypes.func,
  changed: PropTypes.bool,
  setChanged: PropTypes.func,
}

export default CreateGame;
