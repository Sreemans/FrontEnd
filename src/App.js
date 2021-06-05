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
import Markdown from './Components/markdown/markdown';
import HTML from './Components/Html/html';

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
          <Route path='/HTML'>
            <HTML></HTML>
          </Route>
          <Route path="/DataBase">
            <a href='https://gist.github.com/ashish2199/8ad29d80f3195ce3166bee55b2624653'>Github</a>
            <Markdown></Markdown>
          </Route>
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