import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DefaultLayout from '../src/layouts/index';
import { publicRoutes } from '../src/routes/index';
import InGame from './pages/InGame/InGame';
import React from "react";

import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
          <Routes>
              {publicRoutes.map((route, index) => {
                  const Page = route.component;
                  let Layout = DefaultLayout;
                  return (
                      <Route
                          key={index}
                          path={route.path}
                          element={
                              <Layout>
                                  <Page />
                              </Layout>
                          }
                      />
                  );
              })}
          </Routes>
      </div>
      <div className={"App"}>
        <InGame/>
    </div>
  </Router>
  );}

export default App;
