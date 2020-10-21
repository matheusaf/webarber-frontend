import './Styles.css';
import Header from './Header';
import { Helmet } from 'react-helmet';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

export default function Login() {
    const [login, setLogin] = useState({email: '', password: ''});
    const [alert, setAlert] = useState({show: false, message: ``});
    let history = useHistory();
    const url = process.env.baseUrl || "http://localhost:8080";
    const updateForm = (event) => setLogin({...login, [event.target.name]: event.target.value});

    const loginUser = async(user) => {
        try {
            let response = await fetch(`${url}/login`, {
                method: "post",
                headers: new Headers({'Content-Type': 'application/json'}),
                body: JSON.stringify(user)
            });

            let json = await response.json();
            if (response.status !== 200) {
                throw new Error(json.message);
            }
            localStorage.setItem('userId', json.id);
            localStorage.setItem('username', json.nome);
            localStorage.setItem('tipoUsuario', json.idTipo);
            history.push('/');            
        } catch(err) {
            setAlert({show: true, message: `${err.message === "User not found"? "E-mail não encontrado.":"Senha incorreta."}`})
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        loginUser(login);
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
                                <div className='label' htmlFor="email">
                                    E-mail
                                </div>
                                <input id="email" name="email" className="form-control" type="e-mail" placeholder="Digite o seu e-mail" value={login.email} onChange={updateForm}/>
                            </div>
                            <div className="form-group row">
                                <div className='label' htmlFor="senha">
                                    Senha
                                </div>
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
