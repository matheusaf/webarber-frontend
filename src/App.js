import React, { useMemo, useState, useEffect} from 'react';
import {
        BrowserRouter,
        Switch,
        Route,
        Redirect,
        useLocation
} from "react-router-dom";
import Home from './Components/Home/Home';
import Login from './Components/Login/NewLogin';
// import PaginaUsuario from './Pages/User/PaginaUsuario';
import NewSignUp from './Components/SignUp/NewSignUp';
import { UserContext } from './Components/User/UserContext';
// import Barbearias from './Pages/Barbearia/Barbearias';
// import Agendamentos from './Pages/Agendamentos/Agendamentos';
// import PaginaBarbearia from './Pages/Barbearia/PaginaBarbearia';
// import CriarBarbearia from './Pages/Barbearia/CriarBarbearia';
// import EditarBarbearia from './Pages/Barbearia/EditarBarbearia';
// // import { validateUser } from './Pages/User/Controllers/UserController';
require('dotenv').config();

function App() {
  const[webarberUser, setWebarberUser] = useState(null);
  
  // const verifyLocalStorage = async ()=> {
  //   let cachedUser = await JSON.parse(localStorage.getItem("webarberUser"));
  //   if(await validateUser(cachedUser)) setWebarberUser(cachedUser);
  // }

  const userValue = useMemo(() => ({webarberUser, setWebarberUser}), [webarberUser, setWebarberUser]);

  useEffect( () =>{
    // verifyLocalStorage();
  }, [])


  const PrivateRoute = ({ component: Component, ...rest},  ) => {
    let location = useLocation();
    return <Route render={props => 
      (webarberUser && location.pathname.includes(rest['urlPath'])) ? (<Component {...props}/>) : <Redirect exact to="/"/>
    }/>
  }

  const AdminRoute = ({ component: Component, ...rest}) => {
    let location = useLocation();
    console.log(webarberUser && webarberUser.idTipo === 2  && location.pathname.includes(rest["urlPath"]));
    return <Route render={props => 
      (webarberUser && webarberUser.idTipo === 2  && location.pathname.includes(rest["urlPath"]) ) ? (<Component {...props}/>) : <Redirect to="/"/> 
    }/>
  }

   const LoggedInRoute = ({ component: Component, ...rest}) => {
      let location = useLocation();
      return <Route render={props => 
        (!webarberUser && location.pathname === rest["urlPath"]) ? (<Component {...props}/>) : <Redirect to="/"/> 
    }/>
  }

  return (
      <BrowserRouter>
       <header>
       </header>
       <div>
         <Switch>
           <Route exact path="/signup" component={NewSignUp} urlPath="/signup" />
           <UserContext.Provider value={userValue}>
             <Route exact path="/login" component={Login} urlPath="/login" />
             <Route exact path="/" component={Home}/>
             {/* <Route exact path="/users/:id" component={PaginaUsuario} urlPath="/users/" />
             <Route exact path="/agendamentos" component={Agendamentos} urlPath="/agendamentos" />
             <Route exact path="/barbearias" component={Barbearias} urlPath="/barbearias" />
             <Route exact path="/barbearias/:id" component={PaginaBarbearia} urlPath="/barbearias/" />
             <Route exact path="/cadastrarBarbearia" component={CriarBarbearia} urlPath = "/cadastrarBarbearia" />
             <Route exact path="/editarBarbearia/:id" component={EditarBarbearia} urlPath = "/editarBarbearia/" /> */}
           </UserContext.Provider>
         </Switch>
       </div>
      <footer>
      </footer>
    </BrowserRouter>
  );
}

export default App;
