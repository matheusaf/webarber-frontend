import React from 'react';
import {
        BrowserRouter as Router,
        Switch,
        Route
} from "react-router-dom";
import Login from './Pages/User/Login';
import SignIn from './Pages/User/SignIn';
import Home from './Pages/Home/Home';
import Barbearias from './Pages/Barbearia/Barbearias';
import CadastrarBarbearia from './Pages/Barbearia/CadastrarBarbearia';
import Agendamentos from './Pages/Agendamentos/Agendamentos';

function App() {
  return (
    <Router>
      <header>
      </header>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signin" component={SignIn} />
          <Route path="/barbearias" component={Barbearias} />
          <Route path="/agendamentos" component={Agendamentos} />
          <Route path="/cadastrarBarbearia" component={CadastrarBarbearia} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
      <footer>
      </footer>
    </Router>
  );
}

export default App;
