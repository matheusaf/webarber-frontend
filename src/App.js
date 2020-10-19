import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Home from './Pages/Home/Home.jsx';
import User from './Pages/User/User.jsx'

function App() {
  return (
    <Router>
      <header>
      </header>
      <div>
        <Switch>
          <Route path="/login" component={User} />
          <Route path="/register" component={User} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
      <footer>
      </footer>
    </Router>
  );
}

export default App;
