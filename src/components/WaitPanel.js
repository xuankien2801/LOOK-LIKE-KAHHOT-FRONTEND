import React from 'react';
import { GroupDiv } from '../pages/dashboard';
import Title from './Title';

// This component is used by the playGame page
// while the player waits for the admin to start
// the game
const WaitPanel = () => {
  return (
    <>
      <GroupDiv>
        <Title name="Game Will Start Soon!"></Title>
        <p>Waiting for the host to start the session...</p>
      </GroupDiv>
    </>
  )
}

export default WaitPanel;
