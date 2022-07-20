import React from 'react';
import Dashboard from '../components/Dashboard';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import AdminNavBar from '../components/AdminNavBar';

export const GroupDiv = styled.div`
  background-color: #fff;
  width: 90%;
  max-width: 700px;
  margin: 20px auto 30px auto;
  padding: 23px;
  border-radius: 8px;
  box-shadow: 0px 2px 2px 2px #dedede;
`;

export const FormDiv = styled.div`
  background-color: #fff;
  width: 90%;
  max-width: 700px;
  margin: 20px auto;
  padding: 23px;
  border-radius: 8px;
  box-shadow: 0px 2px 2px 2px #dedede;
`;

// This page is the game dashboard page requied by 2.2.1
const HomePage = () => {
  return (
    <div>
      <Helmet bodyAttributes={{ style: 'background-color : #fafafa' }} />
      <header>
        <nav>
          <AdminNavBar />
        </nav>
      </header>
      <main>
        <Dashboard/>
      </main>
    </div>
  )
}

export default HomePage;
