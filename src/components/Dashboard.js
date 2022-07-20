import React from 'react';
import GameFeed from './GameFeed';
import { GroupDiv } from '../pages/dashboard';
import ErrorPopup from './ErrorPopup';
import CreateGame from './CreateGame';

// This component is the Dashboard for the dashboard page
// This is where all of the games are shown
const Dashboard = () => {
  const [isClicked, setisClicked] = React.useState(true);
  const [popup, setPopup] = React.useState(false);
  const [desc, setDesc] = React.useState('');
  const [changed, setChanged] = React.useState(false);

  // This function allows the popup to be triggered
  const activatePopup = () => {
    console.log(desc);
    setPopup(!popup);
  }

  // This function tracks if the CreateGame has been clicked
  // to refresh the GameFeed data
  const changeClicked = () => {
    setisClicked(!isClicked);
  }

  return (
    <>
      {popup && <ErrorPopup title='Error' desc={desc} toggle={() => activatePopup()}></ErrorPopup>}
      <CreateGame key={changed} activatePopup={() => activatePopup()} activateClicked={() => changeClicked()} changed={changed} setChanged={setChanged} setDesc={setDesc} />
      <GroupDiv>
        <GameFeed key={changed} click={isClicked}/>
      </GroupDiv>
    </>
  )
}

export default Dashboard;
