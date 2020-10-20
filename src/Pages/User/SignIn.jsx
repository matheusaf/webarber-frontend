import './Styles.css';
import Header from './Header';
import { Helmet } from 'react-helmet';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignIn() {
    const [signin, setSignIn] = useState({ nome: '', sobrenome: '', CPF: '', email: '', confirmacaoEmail: '', password: '', confirmacaoSenha: '', idTipo: null });
    const updateForm = (event) => setSignIn({ ...signin, [event.target.name]: event.target.value });
    
    const createUser = async (user) => {
        try {
            await fetch("http://localhost:8080/users", {
                method: "post",
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify(user)
            });
            setSignIn({ nome: '', sobrenome: '', cpf: '', email: '', confirmacaoEmail: '', password: '', confirmacaoSenha: '', idTipo: null });
        } catch (err) {
            console.log(err);
        }
    }

    const validateInputs = () => {
        return (signin.password !== signin.confirmacaoSenha) ? 1 : (signin.email !== signin.confirmacaoEmail) ? 2 : 0;
    }


    const handleAlerts = (result) => {
        let alertMessage;
        switch (result) {
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
        return `btn btn-custom ${(handleButtonState()) ? "active" : "disabled"}`;
    }


    const handleButtonState = () => {
        return signin.email !== "" && validateInputs() && signin.password.length >= 8 && (signin.CPF.length >= 11 && signin.CPF.length <= 15) && signin.idTipo !== '0';
    }

    return (
        <>
            <Helmet>
                <title>Cadastro</title>
            </Helmet>
            <Header></Header>
            <div className="container">
                <div className="row">
                    <form onSubmit={handleSubmit}>
                        <fieldset>
                            <div className="form-group row">
                                <div className="label" htmlFor="nome">
                                    Nome
                                </div>
                                <input id="nome" name="nome" className="form-control" type="text" placeholder="John" onChange={updateForm} value={signin.nome} required={true} />
                            </div>
                            <div className="form-group row">
                                <div className="label" htmlFor="sobrenome">
                                    Sobrenome
                                </div>
                                <input id="sobrenome" name="sobrenome" className="form-control" type="text" placeholder="Eid Fernandes" onChange={updateForm} required={true} value={signin.sobrenome} />
                            </div>
                            <div className="form-group row">
                                <div className="label" htmlFor="cpf">
                                    CPF/CNPJ
                                </div>
                                <input id="cpf" className="form-control" name="CPF" minLength="11" maxLength="15" type="text" placeholder="123.456.789-10" onChange={updateForm} required={true} value={signin.CPF}/>
                            </div>
                            <div className="form-group row">
                                <div className="label" htmlFor="email">
                                    E-mail
                                </div>
                                <input id="email" className="form-control" name="email" type="email" placeholder="exemplo@email.com" onChange={updateForm} value={signin.email} />
                            </div>
                            <div className="form-group row" >
                                <div className="label" htmlFor="confirmacaoEmail">
                                    Confirme o e-mail
                                </div>
                                <input id="confirmacaoEmail" className="form-control" name="confirmacaoEmail" type="email" placeholder="exemplo@email.com" onChange={updateForm} value={signin.confirmacaoEmail}/>
                            </div>
                            <div className="form-group row">
                                <div className="label" htmlFor="senha">
                                    Senha
                                </div>
                                <input id="senha" className="form-control" name="password" minLength="8" type="password" placeholder="Senha" onChange={updateForm} value={signin.password} />
                            </div>
                            <div className="form-group row">
                                <div className="label" htmlFor="confirmacaoSenha">
                                    Confirme a senha
                                </div>
                                <input id="confirmacaoSenha" className="form-control" name="confirmacaoSenha" minLength="8" type="password" placeholder="Confirme a senha" onChange={updateForm} value={signin.confirmacaoSenha}/>
                            </div>
                            <p>A senha precisa ter no mínimo 8 caracteres</p>
                            <div className="form-group row">
                                <div className="label" htmlFor="confirmacaoSenha">
                                    Tipo da conta:
                                </div>
                                <select className="form-control" name="idTipo" id="select" onChange={updateForm} required>
                                    <option className="option" value="0" defaultValue>Selecione</option>
                                    <option className="option" value="1">Usuário</option>
                                    <option className="option" value="2">Moderador</option>
                                </select>
                            </div>
                            {handleAlerts()}
                            <div className="container">
                                <Link to="/login">
                                    <div className="mylink">
                                        Já é cadastrado?
                                    </div>
                                </Link>
                            </div>
                            <button type="submit" disabled={!handleButtonState()} className={handleButtonClass()}>Cadastrar</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </>
    )
}
