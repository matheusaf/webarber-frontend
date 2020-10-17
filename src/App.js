import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './components/home.jsx';

function App() {
  return (
    <Router>
      <header>
      </header>
      <div>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </div>
      <footer>
      </footer>
    </Router>
  );
}

export default App;
