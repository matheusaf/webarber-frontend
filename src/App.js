import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './components/login.jsx';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" component={Login} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
