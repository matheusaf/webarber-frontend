import React from 'react';
import {
        BrowserRouter,
        Switch,
        Route,
        Router,
        Redirect
} from "react-router-dom";
import Login from './Pages/User/Login';
import SignUp from './Pages/User/SignUp';
import Home from './Pages/Home/Home';
import Barbearias from './Pages/Barbearia/Barbearias';
import Erro from './Pages/Erro/Erro';
import CadastrarBarbearia from './Pages/Barbearia/CadastrarBarbearia';
import Agendamentos from './Pages/Agendamentos/Agendamentos';

function App() {

  const PrivateRoute = ({ component: Component, ...rest}) => {
    return <Route render={props => 
      (localStorage.getItem('id') !== '' && localStorage.getItem('tipoUsuario') !== '')?
      (<Component {...props}/>)
      :
      <Redirect to="/login"/> 
    }/>
  }

  const AdminRoute = ({ component: Component, ...rest}) => {
    return <Route render={props => 
      (localStorage.getItem('tipoUsuario') === '2')?
      (<Component {...props}/>)
      :
      <Redirect to="/"/> 
    }/>
  }

  return (
    <BrowserRouter>
      <header>
      </header>
      <div>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={SignUp} />
          <PrivateRoute path="/agendamentos" component={Agendamentos} />
          <AdminRoute path="/barbearias" component={Barbearias} />
          <AdminRoute path="/cadastrarBarbearia" component={CadastrarBarbearia} />
          <Route path="/" component={Home} />
          <Route path='*' exact={true} component={Erro} />
        </Switch>
      </div>
      <footer>
      </footer>
    </BrowserRouter>
  );
}

export default App;
