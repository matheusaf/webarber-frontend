import './Styles.css';
import Header from './Header';
import { Helmet } from 'react-helmet';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
    const [login, setLogin] = useState({email: '', password: ''});

    const updateForm = (event) => setLogin({...login, [event.target.name]: event.target.value});

    const loginUser = async(user) => {
        try {
            let response = await fetch("http://localhost:8080/login", {
                method: "post",
                headers: new Headers({'Content-Type': 'application/json'}),
                body: JSON.stringify(user)
            });
            response = await response.json();
            console.log(response);
            if (response.status !== 200) {
                throw new Error(response.status);
            }
            
            // setAlert({show: true, success: true, message: `Animal Created`})
            setLogin({});
        } catch(err) {
            console.log(err);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(login);
        loginUser(login);
    }

    const handleButtonClass = () => {
        return `btn btn-custom ${(handleButtonState())? "active" : "disabled"}`;
    }

    const handleButtonState = () => {
        return login.email !== "" && login.password.length >=8;
    }

    const handleWrongPasswordAlert = () => {
        return (
                <div className="alert alert-danger" role="alert">
                    <strong>Senha incorreta.</strong>
                </div>
        );
    }

    const handleWrongEmailAlert = () => {
        return (
            <div className="alert alert-danger" role="alert">
                <strong>E-mail não cadastrado.</strong> 
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
                                <input id="email" name="email" className="form-control" type="e-mail" placeholder="Digite o seu e-mail" onChange={updateForm}/>
                            </div>
                                {handleWrongEmailAlert()}
                            <div className="form-group row">
                                <div className='label' htmlFor="senha">
                                    Senha
                                </div>
                                <input id="senha" className="form-control" name="password" minLength="8" type="password" placeholder="Digite sua senha" onChange={updateForm}/>
                            </div>
                            {handleWrongPasswordAlert()}
                            <div className="container">
                                <Link to="/signin">
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
