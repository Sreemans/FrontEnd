import React from "react";
import "./App.scss";
import Dashboard from "./Components/Dashboard/Dashboard";
import JavaScript from "./Components/JavaScript/JavaScript";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Git from "./Components/Git/Git";
import Markdown from "./Components/markdown/markdown";
import HTML from "./Components/Html/html";
import Excel from "./Components/Excel/Excel";
import { CRP } from "./Components/Crp/crp";

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/HTML">
            <HTML></HTML>
          </Route>
          <Route path="/DataBase">
            <Markdown></Markdown>
          </Route>
          <Route path="/JavaScript">
            <JavaScript />
          </Route>
          <Route path="/Git">
            <Git />
          </Route>
          <Route path="/CRP">
            <CRP />
          </Route>
          <Route path="/">
            <Dashboard />
            <Excel />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
export default (App);
