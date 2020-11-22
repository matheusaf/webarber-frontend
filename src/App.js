import React, { useMemo, useState, useEffect} from "react";
import {
        BrowserRouter,
        Switch,
        Route,
        Redirect,
        useLocation
} from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import SignUp from "./Components/SignUp/SignUp";
import { UserContext } from "./Components/User/UserContext";
import CadastrarBarbearia from "./Components/Barbearia/CadastrarBarbearia";
import EditarBarbearia from "./Components/Barbearia/EditarBarbearia";
import MinhasBarbearias from "./Components/Barbearia/MinhasBarbearias";
import PaginaBarbearia from "./Components/Barbearia/PaginaBarbearia";
import PaginaUsuario from "./Components/User/PaginaUsuario";
import Loading from "./Components/UI/Loading/Loading";
import CadastrarServico from "./Components/Servicos/Formulario/FormularioServico";
import { validateUser } from "./Components/User/Actions/Auth";
import Agendamentos from "./Components/Agendamentos/Agendamentos";
import CadastrarAgendamento from "./Components/Agendamentos/CadastrarAgendamento";


require("dotenv").config();

function App() {
  const[webarberUser, setWebarberUser] = useState(null);
  const[triedLogin, setTriedLogin] = useState(false);
  const[loading, setLoading] = useState(false);
  
  const verifyLocalStorage = async () => {
    setLoading(true);
    let cachedUser = await JSON.parse(localStorage.getItem("webarberUser"));
    if(await validateUser(cachedUser)) {
      setWebarberUser(cachedUser);
    }
    setLoading(false);
    setTriedLogin(true);
  };

  const userValue = useMemo(() => ({webarberUser, setWebarberUser}), [webarberUser, setWebarberUser]);

  useEffect( () => {
    verifyLocalStorage();
  }, []);

  const PrivateRoute = ({ component: Component, ...rest},  ) => {
    let location = useLocation();
    return <Route render={(props) => 
      (webarberUser && location.pathname.includes(rest["urlPath"])) ? (<Component {...props}/>) : <Redirect exact to="/"/>
    }/>;
  };

  const AdminRoute = ({ component: Component, ...rest}) => {
    let location = useLocation();
     if(triedLogin && !webarberUser){
        return (<Redirect to="/login"/>);
     }
     else{
        if(webarberUser.idTipo === 2){
          return <Route render={(props) => (webarberUser && webarberUser.idTipo === 2  && location.pathname.includes(rest["urlPath"]) ) ? (<Component {...props}/>) : <Redirect to="/"/> }/>;
        }
        else{
          return (<Redirect to="/"/>);
        }
     }
  };

   const LoggedInRoute = ({ component: Component, ...rest}) => {
      let location = useLocation();
      if(triedLogin && !webarberUser){
        return (<Loading/>);
      }
        return (<Route render={(props) => (!webarberUser && location.pathname === rest["urlPath"]) ? (<Component {...props}/>) : <Redirect to="/"/> }/>);
  };

  return (
      <BrowserRouter>
       <header>
       </header>
       <div>
         <Switch>
           <Route exact path="/signup" component={SignUp}/>
           <UserContext.Provider value={userValue}>
             <Route exact path="/login" component={Login}/>
             <Route exact path="/" component={Home}/>
             <Route exact path="/cadastrarBarbearia" component={CadastrarBarbearia}/>
             <Route exact path="/editarBarbearia/:id" component={EditarBarbearia}/> 
             <Route exact path="/users/:id" component={PaginaUsuario}/>
             <Route exact path="/cadastrarServico" component={CadastrarServico}/>
             <Route exact path="/agendamentos" component={Agendamentos}/>
             <Route exact path="/cadastrarAgendamento/:id" component={CadastrarAgendamento}/>
             <Route exact path="/barbearia" component={MinhasBarbearias}/>
             <Route exact path="/barbearia/:id" component={PaginaBarbearia}/>
           </UserContext.Provider>
         </Switch>
       </div>
      <footer>
      </footer>
    </BrowserRouter>
  );
}

export default App;
