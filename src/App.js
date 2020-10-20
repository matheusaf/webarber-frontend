import React from 'react';
import {
        BrowserRouter,
        Switch,
        Route,
        Redirect
} from "react-router-dom";
import Login from './Pages/User/Login';
import SignIn from './Pages/User/SignIn';
import Home from './Pages/Home/Home';
import Barbearias from './Pages/Barbearia/Barbearias';
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
          <Route path="/signin" component={SignIn} />
          <PrivateRoute path="/agendamentos" component={Agendamentos} />
          <AdminRoute path="/barbearias" component={Barbearias} />
          <AdminRoute path="/cadastrarBarbearia" component={CadastrarBarbearia} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
      <footer>
      </footer>
    </BrowserRouter>
  );
}

export default App;
