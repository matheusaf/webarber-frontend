import './Styles.css';
import Header from './Header';
import { Helmet } from 'react-helmet';
import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import { Link } from 'react-router-dom';

export default function SignIn(props) {
    const [signin, setSignIn] = useState({ nome: '', sobrenome: '', tipoPessoa: '', CPF: null, CNPJ:null, email: '', confirmacaoEmail: '', password: '', confirmacaoSenha: '', idTipo: '' });
    const url = "https://webarber-back-dev.herokuapp.com"
    const updateForm = (event) => setSignIn({ ...signin, [event.target.name]: event.target.value });
    
    const createUser = async (user) => {
        try {
            let response = await fetch(`${url}/users`, {
                method: "post",
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify(user)
            });
            if(response.status !== 201){
                console.log(response.status)
                alert("E-mail já utilizado.")
            }
            else{
                alert("Cadastro concluído com sucesso.");
                props.history.push("/login")
            }
            setSignIn({ nome: '', sobrenome: '', tipoPessoa: '', CPF: null, CNPJ: null, email: '', confirmacaoEmail: '', password: '', confirmacaoSenha: '', idTipo: ''});
        } catch (err) {
            console.log(err);
        }
    }

    const updateCnpjCpf = (event) => {
        let index = signin.tipoPessoa === "pj" ? "CPF": "CNPJ";
        setSignIn({...signin, [event.target.name]: event.target.value, [index]: null});
    }


    const handleCpfCnpjInput= () =>{
        let index = signin.tipoPessoa === "pj" ? 1: 0;
        const labels = ["CPF", "CNPJ"];
        const placeHolders = ["123.456.789-10", "12.345.678/0001-00"];
        const masks = ["999.999.999-99", "99.999.999/9999-99"];
        return ( 
                <>
                <div className="form-group row">
                    <div className="label" htmlFor="cpf">
                        {labels[index]}
                    </div>
                    <InputMask className="form-control" mask={masks[index]} value={signin[labels[index]]} name ={labels[index]} placeholder={placeHolders[index]} onChange={updateCnpjCpf} type="text"></InputMask>
                </div>
                {signin.tipoPessoa !== "" && signin[labels[index]] === null? <p>{`Preencher ${labels[index]}.`}</p>: ''}
                </>
        )
    }

    const handleSubmit = (event) => {
        console.log(signin);
        event.preventDefault();
        createUser(signin);
    }

    const handleButtonClass = () => {
        return `btn btn-custom ${(handleButtonState()) ? "active" : "disabled"}`;
    }

    const validateCnpjCpf = () =>{
        return  signin.tipoPessoa === "pj" ?  signin[signin.tipoPessoa] !== '' && new RegExp(/\d{2}.\d{3}.\d{3}[/]\d{4}-\d{2}/).test(signin.CNPJ) : signin[signin.tipoPessoa] !== '' && new RegExp(/\d{3}.\d{3}.\d{3}-\d{2}/).test(signin.CPF);
    }
    const handleButtonState = () => {
        return (signin.email !== "") && (signin.password === signin.confirmacaoSenha) && (signin.email === signin.confirmacaoEmail) && (signin.password.length >= 8) && (validateCnpjCpf()) && signin.idTipo !== '' && signin.tipoPessoa !== '';
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
                                <input id="nome" name="nome" className="form-control" type="text" placeholder="John" value={signin.nome} onChange={updateForm} required={true} />
                            </div>
                            <div className="form-group row">
                                <div className="label" htmlFor="sobrenome">
                                    Sobrenome
                                </div>
                                <input id="sobrenome" name="sobrenome" className="form-control" type="text" value={signin.sobrenome} placeholder="Eid Fernandes" onChange={updateForm} required={true} />
                            </div>
                            <div className="form-group row">
                                <div className="label" htmlFor="tipoPessoa">
                                    Tipo Pessoa
                                </div>
                                <select className="form-control" name="tipoPessoa" id="selectTipoPessoa" value={signin.tipoPessoa} onChange={updateForm}>
                                    <option className="option" value="" defaultValue>Selecione</option>
                                    <option className="option" value="pf">PF</option>
                                    <option className="option" value="pj">PJ</option>
                                </select>
                            </div>
                            {signin.tipoPessoa === "" ? <p>Selecionar tipo pessoa.</p>: ''}
                            {handleCpfCnpjInput()}
                            <div className="form-group row">
                                <div className="label" htmlFor="email">
                                    E-mail
                                </div>
                                <input id="email" className="form-control" name="email" type="email" value={signin.email} placeholder="exemplo@email.com" onChange={updateForm} />
                            </div>
                            <div className="form-group row" >
                                <div className="label" htmlFor="confirmacaoEmail">
                                    Confirme o e-mail
                                </div>
                                <input id="confirmacaoEmail" className="form-control" name="confirmacaoEmail" value={signin.confirmacaoEmail} type="email" placeholder="exemplo@email.com" onChange={updateForm} />
                            </div>
                            {signin.email !== signin.confirmacaoEmail && signin.email !== "" ? <p>O e-mail precisa ser igual ao anterior.</p>: ""}
                            <div className="form-group row">
                                <div className="label" htmlFor="senha">
                                    Senha
                                </div>
                                <input id="senha" className="form-control" name="password" minLength="8" type="password" value={signin.password} placeholder="Senha" onChange={updateForm} />
                            </div>
                            {signin.password.length < 8 && signin.password !== "" ? <p>A senha precisa ter no mínimo 8 caracteres</p>: ""}
                            <div className="form-group row">
                                <div className="label" htmlFor="confirmacaoSenha">
                                    Confirme a senha
                                </div>
                                <input id="confirmacaoSenha" className="form-control" name="confirmacaoSenha" minLength="8" type="password" value={signin.confirmacaoSenha} placeholder="Confirme a senha" onChange={updateForm} />
                            </div>
                            {signin.password!== "" && signin.password !== signin.confirmacaoSenha? <p>As senha precisam ser iguais.</p>: ''}
                            <div className="form-group row">
                                <div className="label" htmlFor="confirmacaoSenha">
                                    Tipo de usuário
                                </div>
                                <select className="form-control" name="idTipo" id="select" value={signin.idTipo} onChange={updateForm}>
                                    <option className="option" value="" defaultValue>Selecione</option>
                                    <option className="option" value="1">Usuário</option>
                                    <option className="option" value="2">Moderador</option>
                                </select>
                            </div>
                            {signin.idTipo === "" ? <p>Selecionar tipo de usuário.</p>: ''}
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
