import './index.css';
import createUser from './Signup'
import Header from './Header';
import Input from '../UI/Forms/Input/Input';
import { Helmet } from 'react-helmet';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp(props) {
    const [signup, setSignUp] = useState({ nome: '', sobrenome: '', tipoPessoa: '', CPF: null, CNPJ:null, email: '', confirmacaoEmail: '', password: '', confirmacaoSenha: '', idTipo: '' });
    const updateForm = (event) => setSignUp({ ...signup, [event.target.name]: event.target.value });

    const updateCnpjCpf = (event) => {
        let index = signup.tipoPessoa === "pj" ? "CPF": "CNPJ";
        setSignUp({...signup, [event.target.name]: event.target.value, [index]: null});
    }

    const handleCpfCnpjInput= () =>{
        let index = signup.tipoPessoa === "pj" ? 1: 0;
        const labels = ["CPF", "CNPJ"];
        const placeHolders = ["123.456.789-10", "12.345.678/0001-00"];
        const masks = ["999.999.999-99", "99.999.999/9999-99"];
        return ( 
                <>
                <div className="form-group row">
                    <div className="label" htmlFor="cpf">
                        {labels[index]}
                    </div>
                    <InputMask className="form-control" mask={masks[index]} value={signup[labels[index]]} name ={labels[index]} placeholder={placeHolders[index]} onChange={updateCnpjCpf} type="text"></InputMask>
                </div>
                {signup.tipoPessoa !== "" && signup[labels[index]] === null? <p className = "p-alert"> {`Preencher ${labels[index]}.`}</p>: ''}
                </>
        )
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        let res = await createUser(signup);
        if(res.status === 201){
            alert("Cadastro concluído com sucesso.");
            props.history.push("/login");
            setSignUp({ nome: '', sobrenome: '', tipoPessoa: '', CPF: null, CNPJ: null, email: '', confirmacaoEmail: '', password: '', confirmacaoSenha: '', idTipo: ''});
        }
        else{
            alert(res.message);
        }
    }

    const handleButtonClass = () => {
        return `btn btn-custom ${(handleButtonState()) ? "active" : "disabled"}`;
    }

    const validateCnpjCpf = () =>{
        return  signup.tipoPessoa === "pj" ?  signup[signup.tipoPessoa] !== '' && new RegExp(/\d{2}.\d{3}.\d{3}[/]\d{4}-\d{2}/).test(signup.CNPJ) : signup[signup.tipoPessoa] !== '' && new RegExp(/\d{3}.\d{3}.\d{3}-\d{2}/).test(signup.CPF);
    }
    const handleButtonState = () => {
        return (signup.nome !== '') && (signup.sobrenome !== '') && (signup.email !== "") && (signup.password === signup.confirmacaoSenha) && (signup.email === signup.confirmacaoEmail) && (signup.password.length >= 8) && (validateCnpjCpf()) && signup.idTipo !== '' && signup.tipoPessoa !== '';
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
                                <input id="nome" name="nome" className="form-control" type="text" placeholder="John" value={signup.nome} onChange={updateForm} required={true} />
                            </div>
                            <div className="form-group row">
                                <div className="label" htmlFor="sobrenome">
                                    Sobrenome
                                </div>
                                <input id="sobrenome" name="sobrenome" className="form-control" type="text" value={signup.sobrenome} placeholder="Eid Fernandes" onChange={updateForm} required={true} />
                            </div>
                            <div className="form-group row">
                                <div className="label" htmlFor="tipoPessoa">
                                    Tipo Pessoa
                                </div>
                                <select className="form-control" name="tipoPessoa" id="selectTipoPessoa" value={signup.tipoPessoa} onChange={updateForm}>
                                    <option className="option" value="" defaultValue>Selecione</option>
                                    <option className="option" value="pf">PF</option>
                                    <option className="option" value="pj">PJ</option>
                                </select>
                            </div>
                            {signup.tipoPessoa === "" ? <p className="p-alert">Selecionar tipo pessoa.</p>: ''}
                            <div className="form-group row">
                                <div className="label" htmlFor="confirmacaoSenha">
                                    Tipo de usuário
                                </div>
                                <select className="form-control" name="idTipo" id="select" value={signup.idTipo} onChange={updateForm}>
                                    <option className="option" value="" defaultValue>Selecione</option>
                                    <option className="option" value="1">Usuário</option>
                                    {signup.tipoPessoa === "pj" || signup.tipoPessoa === "" ? <option className="option" value="2">Moderador</option> : null}
                                </select>
                            </div>
                            {/* {signup.idTipo === "" ? <p className="p-alert">Selecionar tipo de usuário.</p>: ''} */}
                            {handleCpfCnpjInput()}
                            <div className="form-group row">
                                <div className="label" htmlFor="email">
                                    E-mail
                                </div>
                                <input id="email" className="form-control" name="email" type="email" value={signup.email} placeholder="exemplo@email.com" onChange={updateForm} />
                            </div>
                            <div className="form-group row" >
                                <div className="label" htmlFor="confirmacaoEmail">
                                    Confirme o e-mail
                                </div>
                                <input id="confirmacaoEmail" className="form-control" name="confirmacaoEmail" value={signup.confirmacaoEmail} type="email" placeholder="exemplo@email.com" onChange={updateForm} />
                            </div>
                            {signup.email !== signup.confirmacaoEmail && signup.email !== "" ? <p className="p-alert">O e-mail precisa ser igual ao anterior.</p>: ""}
                            <div className="form-group row">
                                <div className="label" htmlFor="senha">
                                    Senha
                                </div>
                                <input id="senha" className="form-control" name="password" minLength="8" type="password" value={signup.password} placeholder="Senha" onChange={updateForm} />
                            </div>
                            {signup.password.length < 8 && signup.password !== "" ? <p className="p-alert">A senha precisa ter no mínimo 8 caracteres</p>: ""}
                            <div className="form-group row">
                                <div className="label" htmlFor="confirmacaoSenha">
                                    Confirme a senha
                                </div>
                                <input id="confirmacaoSenha" className="form-control" name="confirmacaoSenha" minLength="8" type="password" value={signup.confirmacaoSenha} placeholder="Confirme a senha" onChange={updateForm} />
                            </div>
                            {signup.password!== "" && signup.password !== signup.confirmacaoSenha? <p className="p-alert">As senha precisam ser iguais.</p>: ''}
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
