import React from 'react';
import './App.scss';
import Dashboard from './Components/Dashboard/Dashboard';
import JavaScript from './Components/JavaScript/JavaScript'
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Git from './Components/Git/Git';

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
          <Route path="/Git">
            <Git />
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