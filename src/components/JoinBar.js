import React from 'react';
import PropTypes from 'prop-types';
import { GroupDiv } from '../pages/dashboard';
import { TextField } from '@mui/material';
import FullButton from './FullButton';
import { useNavigate } from 'react-router-dom';
import ErrorPopup from './ErrorPopup';
import Title from './Title';

const FieldStyle = {
  width: '100%',
  margin: '0 0 20px 0',
}

// This component is used by the playJoin page
// to get the user to join a game
const JoinBar = ({ sessionId }) => {
  const navigate = useNavigate();
  const [name, setName] = React.useState('');
  const [popup, setPopup] = React.useState(false);
  const [seshId, setSeshId] = React.useState();
  const [desc, setDesc] = React.useState('');
  const descTitle = 'Error';

  // This useEffect stores the sessionId inside
  // a state variable to be used later
  React.useEffect(() => {
    setSeshId(sessionId);
  }, []);

  // This function activates the error popup
  const activatePopup = () => {
    setPopup(!popup)
  }

  // This function attempts to get the user to
  // join a game by calling the backend
  const joinGame = async () => {
    if (name === '') {
      setDesc('Please provide a name.');
      activatePopup();
      return;
    }

    const req = await fetch(`http://localhost:5005/play/join/${seshId}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        name: name,
      })
    });
    console.log(req);
    const response = await req.json();
    if (req.ok) {
      navigate(`/playing/player/${response.playerId}`);
    } else {
      setDesc(response.error);
      activatePopup();
    }
  }
  return (
    <>
      {popup && <ErrorPopup title={descTitle} desc={desc} toggle={activatePopup} />}
      <GroupDiv>
        <Title name="Join A Session"></Title>
        <form aria-label='Join session form'>
          <div>
            <TextField
              required
              style={FieldStyle}
              id="Session-Id-Field"
              label="Session Id"
              defaultValue={ sessionId }
              onChange={e => setSeshId(e.target.value)}
              aria-label='Session id field'
            />
          </div>
          <div>
            <TextField
              required
              style={FieldStyle}
              id="Name-Field"
              label="Name"
              onChange={e => setName(e.target.value)}
              aria-label='Name field'
            />
          </div>
        </form>
        <FullButton text="Join Game" onClick={joinGame} aria='Join game button'/>
      </GroupDiv>
    </>
  )
}

JoinBar.propTypes = {
  sessionId: PropTypes.string,
}

export default JoinBar;
