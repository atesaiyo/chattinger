import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import SignIn from "./components/SignIn";
import Chat from "./components/Chat";

const App = () => (
  <Router>
    <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/*" component={Chat} />
    </Switch>
  </Router>
);

export default App;
