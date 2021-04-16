import React from 'react';
import './App.scss';
import Dashboard from './Components/Dashboard/Dashboard';
import Poker from './Components/POKER/Poker';
import Board from './Components/Board/Board';
import JavaScript from './Components/JavaScript/JavaScript'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    // <div className="App">
    //   <Dashboard />
    //   {/* <Poker/> */}
    //   <Board/>
    // </div>

    <Router>
      <div>
        <Switch>
         
          <Route path="/JavaScript">
            <JavaScript />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default (App);