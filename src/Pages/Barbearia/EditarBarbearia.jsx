import { Helmet } from 'react-helmet';
import NavBar from '../NavBar';
import React, { useState, useEffect } from 'react';
import './CadastrarBarbearia.css'
import { useParams } from 'react-router-dom';

export default function EditarBarbearia() {
    const [create, setCreate] = useState({
        nome:'', endereco: '', enderecoNumero: '', bairro: '', 
        cidade: '', estado:'', telefone:'', horarioAbertura: '10:10:10',
        horarioFechamento: '22:22:22', user_id : Number(localStorage.getItem('userId'))
    });
    
    const updateForm = (event) => setCreate({ ...create, [event.target.name]: event.target.value });
    const url = "https://webarber-back-dev.herokuapp.com";
    let { id } = useParams();

    async function getBarbearia() {
        try {

            const response = await fetch(`${url}/barbearias/${id}`, {
                method: "get",
                headers: new Headers({'Content-Type': 'application/json'}),
                body: JSON.stringify(create)
            })
            let json = await response.json();
            if (response.status !== 200) {
                throw new Error(json.message);
            }
            setCreate(...json);
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        getBarbearia();
    	return () => console.log('removing effect editar');
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let horarioAbertura = new Date();
            horarioAbertura.setHours(...create.horarioAbertura.split(':'));
            create.horarioAbertura = horarioAbertura;

            let horarioFechamento = new Date();
            horarioFechamento.setHours(...create.horarioFechamento.split(':'));
            create.horarioFechamento = horarioFechamento

            const response = await fetch(`${url}/barbearias`, {
                method: "patch",
                headers: new Headers({'Content-Type': 'application/json'}),
                body: JSON.stringify(create)
            })
            let json = await response.json();
            if (response.status !== 200) {
                throw new Error(json.message);
            }
        } catch (err) {
            console.log(err.message);
        }
    }
    
    const handleButtonClass = () => {
        return `btn btn-custom ${(handleButtonState())? "active" : "disabled"}`;
    }


    const handleButtonState = () => {
        for (let prop of create) {
            if (!create[prop] && create[prop].length < 2)
                return false;
        }
        return true;
    }

    return (
            <>
            <Helmet>
                <title>Alterar barbearia</title>
            </Helmet>
            <NavBar></NavBar>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <div className="form-group row">
                            <label className="label" htmlFor="nomeBarbearia">
                                Nome Barbearia
                            </label>
                            <input id="nomeBarbearia" name="nome" className="form-control" type="text" placeholder="Nome Barbearia" onChange={updateForm} value={create.nome}/>
                        </div>
                        <div className="form-group row">
                            <div className="col address">
                                <label className="label" htmlFor="endereco">
                                    Endereço
                                </label>
                                <input id="endereco" name="endereco" className="form-control address" type="text" placeholder="Endereço" onChange={updateForm} value={create.endereco}/>
                            </div>
                            <div className="col number">
                                <label className="label" htmlFor="enderecoNumero">
                                    Nº
                                </label>
                                <input id="enderecoNumero" name="enderecoNumero" className="form-control number" type="number" placeholder="Nº" onChange={updateForm} value={create.enderecoNumero}/>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="label" htmlFor="bairro">
                                Bairro
                            </label>
                            <input id="bairro" name="bairro" className="form-control" type="text" placeholder="Bairro" onChange={updateForm} value={create.bairro}/>
                        </div>
                        <div className="form-group row">
                            <label className="label" htmlFor="cidade">
                                Cidade
                            </label>
                            <input id="cidade" name="cidade" className="form-control" type="text" placeholder="Cidade" onChange={updateForm} value={create.cidade}/>
                        </div>
                        <div className="form-group row">
                            <label className="label" htmlFor="estado">
                                Estado
                            </label>
                            <input id="estado" name="estado" className="form-control" type="text" placeholder="Estado" onChange={updateForm} value={create.estado}/>
                        </div>
                        <div className="form-group row">
                            <label className="label" htmlFor="telefone">
                                Telefone
                            </label>
                            <input id="telefone" name="telefone" className="form-control" type="phone" placeholder="+12 (34) 56789-1011" onChange={updateForm} value={create.telefone}/>
                        </div>
                        
                        <div className="form-group row">
                            <div className="col">
                                <label className="label" htmlFor="hrAbertura">
                                    Hora Abertura
                                </label>
                                <input id="hrAbertura" name="horarioAbertura" className="form-control" type="time" value={create.horarioAbertura} onChange={updateForm}/>
                            </div>
                            <div className="text">
                                até
                            </div>
                            <div className="col">
                                <label className="label" htmlFor="horarioFechamento">
                                    Hora Fechamento
                                </label>
                                <input id="hrFechamento" name="horarioFechamento" className="form-control" type="time" value={create.horarioFechamento} onChange={updateForm}/>
                            </div>
                        </div>
                        <button disabled={!handleButtonState()} className={handleButtonClass()} style = {{ marginLeft:"25%" }}>Editar Barbearia</button>
                    </fieldset>
                </form>
            </div>
            </>
    );

}
