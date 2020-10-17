import React, { useState } from 'react';
import './Login.css'

export default function Register() {
    // Hooks
    const [signin, setSignIn] = useState({email: '', confirmEmail: '', password:'', confirmPassword:''});

    const updateForm = (event) => setSignIn({ ...signin, [event.target.name]: event.target.value });

    const createUser = async (user) => {
        try {
            await fetch("https://localhost:8080/users", {
                method: "post",
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify(user)
            });
            // const json = await res.json();
            // setAlert({show: true, success: true, message: `Animal Created`})
            setSignIn({});
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = (event) => {
        console.log(signin);
        event.preventDefault();
        createUser(signin);
    }

     const handleButtonClass = () => {
        const button = "btn";
        return (signin.email !== "" && signin.password.length >= 8 && signin.password.length <=12) ? `${button} active` : `${button} disabled`;
    }


     const handleButtonState = () => {
        return signin.email !== "" && signin.password.length >=8 && signin.password.length <=12;
    }

    return (
        <div className="row">
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <div className="form-group row">
                        <div className="label" for="nome">
                            Nome
                        </div>
                        <input id="nome" name="nome" className="form-control" type="text" placeholder="John" onChange={updateForm} required={true} />
                    </div>
                    <div className="form-group row">
                        <div className="label" for="sobrenome">
                            Sobrenome
                        </div>
                        <input id="sobrenome" name="sobrenome" className="form-control" type="text" placeholder="Eid Fernandes" onChange={updateForm} required={true} />
                    </div>
                    <div className="form-group row">
                        <div className="label" for="cpf">
                            CPF
                        </div>
                        <input id="cpf" className="form-control" name="cpf" minLength="11" maxLength="15" type="text" placeholder="123.456.789-10" pattern="(\d{3}\.){3}(\d{2})" onChange={updateForm} required={true} />
                    </div>
                     <div className="form-group row">
                        <div className="label" for="email">
                            E-mail
                        </div>
                        <input id="email" className="form-control" name="email" minLength="8" maxLength="12" type="password" placeholder="exemplo@email.com" onChange={updateForm} required={true} />
                    </div>
                    <div className="form-group row">
                        <div className="label" for="confirmacaoEmail">
                            Confirme o e-mail
                        </div>
                        <input id="confirmacaoEmail" className="form-control" name="confirmacaoEmail" type="email" placeholder="exemplo@email.com" onChange={updateForm} required={true} />
                    </div>
                    <div className="form-group row">
                        <div className="label" for="senha">
                            Senha
                        </div>
                        <input id="senha" className="form-control" name="senha" minLength="8" maxLength="12" type="password" placeholder="Senha" onChange={updateForm} required={true} />
                    </div>
                    <div className="form-group row">
                        <div className="label" for="confirmacaoSenha">
                            Confirme a senha
                        </div>
                        <input id="confirmacaoSenha" className="form-control" name="confirmacaoSenha" minLength="8" maxLength="12" type="password" placeholder="Senha" onChange={updateForm} required={true} />
                    </div>
                    <div className="form-group row">
                            <input className="form-check-input" type="checkbox" id="termos"></input>
                            <div className="label">Concordo com os termos.</div>
                    </div>
                    <button type="submit" className={handleButtonClass()}>Cadastrar</button>
                </fieldset>
            </form>
        </div>
    )
}
