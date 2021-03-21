import React from 'react';
import './App.scss';
import Dashboard from './Components/Dashboard/Dashboard';
import Poker from './Components/POKER/Poker';
import Board from './Components/Board/Board';
// import withRouter from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <Dashboard /> */}
      {/* <Poker/> */}
      <Board/>
    </div>
  );
}
export default (App);