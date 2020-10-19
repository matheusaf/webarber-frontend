import './Styles.css';
import { Helmet } from 'react-helmet';
import React, { useState } from 'react';

export default function Register() {
    // Hooks
    const [signin, setSignIn] = useState({nome:'', sobrenome: '', cpf: '', email: '', confirmacaoEmail: '', senha:'', confirmacaoSenha:''});

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

    const validateInputs = () =>{
        return (signin.senha !== signin.confirmacaoSenha) ? 1 : (signin.email !== signin.confirmacaoEmail) ? 2: 0;
    }

    
    const handleAlerts = (result) =>{
        let alertMessage;
        switch(result){
            case 1:
                alertMessage = "As senhas apresentadas não são iguais.";
                break;
            case 2:
                alertMessage = "Os E-mails apresentados não são iguais.";
                break;
            default:
                return;
        }
        return (
                <div className="alert alert-danger" role="alert"> 
                    <strong> {alertMessage} </strong>
                </div>
        );
    }

    const handleSubmit = (event) => {
        console.log(signin);
        event.preventDefault();
        createUser(signin);
    }

     const handleButtonClass = () => {
        const button = "btn";
        return (signin.email !== "" && signin.senha.length >= 8 && (signin.cpf.length>=11 && signin.cpf.length<=15)) ? `${button} active` : `${button} disabled`;
    }


     const handleButtonState = () => {
        return signin.email !== "" && signin.senha.length >=8 && (signin.cpf.length>=11 && signin.cpf.length<=15);
    }
    
    return (
        <>
            <Helmet>
                <title>Cadastro</title>
            </Helmet>
            <div className="row">
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <div className="form-group row">
                            <div className="label" htmlFor="nome">
                                Nome
                            </div>
                            <input id="nome" name="nome" className="form-control" type="text" placeholder="John" onChange={updateForm} required={true} />
                        </div>
                        <div className="form-group row">
                            <div className="label" htmlFor="sobrenome">
                                Sobrenome
                            </div>
                            <input id="sobrenome" name="sobrenome" className="form-control" type="text" placeholder="Eid Fernandes" onChange={updateForm} required={true} />
                        </div>
                        <div className="form-group row">
                            <div className="label" htmlFor="cpf">
                                CPF
                            </div>
                            <input id="cpf" className="form-control" name="cpf" minLength="11" maxLength="15" type="text" placeholder="123.456.789-10" pattern="(\d{3}\.){3}-(\d{2})" onChange={updateForm} required={true} />
                        </div>
                        <div className="form-group row">
                            <div className="label" htmlFor="email">
                                E-mail
                            </div>
                            <input id="email" className="form-control" name="email" type="email" placeholder="exemplo@email.com" onChange={updateForm}/>
                        </div>
                        <div className="form-group row" >
                            <div className="label" htmlFor="confirmacaoEmail">
                                Confirme o e-mail
                            </div>
                            <input id="confirmacaoEmail" className="form-control" name="confirmacaoEmail" type="email" placeholder="exemplo@email.com" onChange={updateForm}/>
                        </div>
                        <div className="form-group row">
                            <div className="label" htmlFor="senha">
                                Senha
                            </div>
                            <input id="senha" className="form-control" name="senha" minLength="8" type="password" placeholder="Senha" onChange={updateForm}/>
                        </div>
                        <div className="form-group row">
                            <div className="label" htmlFor="confirmacaoSenha">
                                Confirme a senha
                            </div>
                            <input id="confirmacaoSenha" className="form-control" name="confirmacaoSenha" minLength="8" type="password" placeholder="Senha" onChange={updateForm}/>
                        </div>
                        <p>A senha precisa ter no mínimo 8 caracteres</p>
                        {handleAlerts()}
                        <button type="submit" disabled={!handleButtonState()} className={handleButtonClass()}>Cadastrar</button>
                    </fieldset>
                </form>
            </div>
        </>
    )
}
