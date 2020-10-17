import React, { useState } from 'react';
import './Login.css'

export default function Log() {
    // Hooks
    const [login, setLogin] = useState({email: '', password: ''});

    const updateForm = (event) => setLogin({...login, [event.target.name]: event.target.value});

    const loginUser = async(user) => {
        try {
            await fetch("https://localhost:8080/users", {
                method: "post",
                headers: new Headers({'Content-Type': 'application/json'}),
                body: JSON.stringify(user)
            });
            // const json = await res.json();
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
        const button = "btn";
        return (login.email !== "" && login.password.length >= 8 && login.password.length <=12) ? `${button} active` : `${button} disabled`;
    }

    const handleButtonState = () => {
        return login.email !== "" && login.password.length >=8 && login.password.length <=12;
    }

    const handleWrongPasswordAlert = () => {
        return <div className="alert alert-danger" role="alert">
                    <b>Senha incorreta.</b>
               </div>;
    }

    const handleWrongEmailAlert = () => {
        return <div className="alert alert-danger" role="alert">
                    <b>E-mail não cadastrado.</b> 
                </div>;
    }
    
    return (
        <div className="row">
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <div className="form-group row">
                        <div className='label'>
                            E-mail
                        </div>
                        <input id="email" name="email" className="form-control" type="e-mail" placeholder="Digite o seu e-mail" onChange={updateForm}/>
                    </div>
                        {handleWrongEmailAlert()}
                    <div className="form-group row">
                        <div className='label'>
                            Senha
                        </div>
                        <input id="password" className="form-control" name="password" minLength="8" maxLength="12" type="password" placeholder="Digite sua senha" onChange={updateForm}/>
                    </div>
                        {handleWrongPasswordAlert()}
                    <button type="submit" disabled={!handleButtonState()} className={handleButtonClass()}>Login</button>
                </fieldset>
            </form>
        </div>
    )
}
