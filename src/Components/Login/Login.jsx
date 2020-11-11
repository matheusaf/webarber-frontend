import './index.css';
import Header from '../User/Header';
import { Helmet } from 'react-helmet';
import React, { useState, useContext } from 'react';
import { Link, useHistory, Redirect } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import Input from '../UI/Forms/Input/Input';

export default function Logins() {
    const [login, setLogin] = useState({email: '', password: ''});
    const [alert, setAlert] = useState({show: false, message: ``});
    const { webarberUser ,setWebarberUser } = useContext(UserContext);

    let history = useHistory();

    const updateForm = (event) => setLogin({...login, [event.target.name]: event.target.value});

    const handleLogin = async () => {
        try{
            let {response, usuario} = await loginUser(login);
            if (response.status !== 200 ) {
                throw new Error(response.message);
            }
            let webarberUser = {id: usuario.id, nome: usuario.nome, idTipo: usuario.idTipo, sessionToken: usuario.sessionToken}
            localStorage.setItem('webarberUser', JSON.stringify(webarberUser));
            setWebarberUser(webarberUser);
            history.push('/');            
        } catch(err) {
            setAlert({show: true, message: `${err.message === "User not found"? "E-mail não encontrado.":"Senha incorreta."}`})
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await handleLogin();
    }

    const handleButtonClass = () => {
        return `btn btn-custom ${(handleButtonState())? "active" : "disabled"}`;
    }


    const handleButtonState = () => {
        return login.email !== "" && login.password.length >=8;
    }

    const handleSignInError = () => {
        return (
            <div className="alert alert-danger" role="alert">
                <strong>{alert.message}</strong>
            </div>
        );
    }
    
    return (
        <>
            <Helmet>
                <title>Login</title>
            </Helmet>
            <Header></Header>
            <div className="container">
                <div className="row">
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <div className="form-group row">
                                <Input label="E-mail" id="email" name="email" className="form-control" type="e-mail" placeholder="Digite o seu e-mail" value={login.email} onChange={updateForm}/>
                            </div>
                            <div className="form-group row">
                                <input id="senha" className="form-control" name="password" minLength="8" type="password" placeholder="Digite sua senha" value={login.password} onChange={updateForm}/>
                            </div>
                            {alert.show && handleSignInError()}
                            <div className="container">
                                <Link to="/signup">
                                    <div className="mylink">
                                        Não é cadastrado?
                                    </div>
                                </Link>
                            </div>
                            <button type="submit" disabled={!handleButtonState()} className={handleButtonClass()}>Login</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </>
    )
}
