import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Pages/User/Login';
import SignIn from './Pages/User/SignIn';
import Home from './Pages/Home/Home'

function App() {
  return (
    <Router>
      <header>
      </header>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signin" component={SignIn} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
      <footer>
      </footer>
    </Router>
  );
}

export default App;
