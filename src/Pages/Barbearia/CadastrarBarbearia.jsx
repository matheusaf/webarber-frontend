import { Helmet } from 'react-helmet';
import NavBar from '../NavBar';
import React, { useState } from 'react';
import './CadastrarBarbearia.css'
import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

export default function CadastrarBarbearia() {
    const [create, setCreate] = useState({nomeBarbearia:'', endereco: '', enderecoNumero: '', bairro: '', 
                                cidade: '', estado:'', telefone:'', 
                                activeDay: "Seg",
                                Seg: {hrAbertura: '', hrFechamento:''},
                                Ter: {hrAbertura: '', hrFechamento:''},
                                Qua: {hrAbertura: '', hrFechamento:''},
                                Qui: {hrAbertura: '', hrFechamento:''},
                                Sex: {hrAbertura: '', hrFechamento:''},
                                Sab: {hrAbertura: '', hrFechamento:''},
                                Dom: {hrAbertura: '', hrFechamento:''}
    });
    
    const updateForm = (event) => setCreate({ ...create, [event.target.name]: event.target.value });

    const handleDaysButton = (event) =>{
        event.preventDefault();
        setCreate({...create, activeDay: event.target.name})
    }

    const handleDaysForm = (event) =>{
        if(create.activeDay ===  null) alert("Selecionar uma data");
        else{
            setCreate({ ...create, [create.activeDay]:{...create[create.activeDay], [event.target.name]: event.target.value}});
        }
    }

    // Hooks
    const renderDays = () => {
        const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
        return (
            <>
            {days.map(day => 
            <div className="col-xs day">
                <button id={day} name={day} className={`btn btn-day ${create.activeDay == day ? 'active' : 'disabled'}`} onClick={handleDaysButton}>{day}</button>
            </div>)}
            </>)

    }
    return (
            <>
            <Helmet>
                <title>Cadastrar barbearia</title>
            </Helmet>
            <NavBar></NavBar>
            <div className="container">
                <form>
                    <fieldset>
                        <div className="form-group row">
                            <label className="label" htmlFor="nomeBarbearia">
                                Nome Barbearia
                            </label>
                            <input id="nomeBarbearia" name="nomeBarbearia" className="form-control" type="text" placeholder="Nome Barbearia" onChange={updateForm}></input>
                        </div>
                        <div className="form-group row">
                            <div className="col address">
                                <label className="label" htmlFor="endereco">
                                    Endereço
                                </label>
                                <input id="endereco" name="endereco" className="form-control address" type="text" placeholder="Endereço" onChange={updateForm}></input>
                            </div>
                            <div className="col number">
                                <label className="label" htmlFor="enderecoNumero">
                                    Nº
                                </label>
                                <input id="enderecoNumero" name="enderecoNumero" className="form-control number" type="number" placeholder="Nº" onChange={updateForm}></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="label" htmlFor="bairro">
                                Bairro
                            </label>
                            <input id="bairro" name="bairro" className="form-control" type="text" placeholder="Bairro" onChange={updateForm}></input>
                        </div>
                        <div className="form-group row">
                            <label className="label" htmlFor="cidade">
                                Cidade
                            </label>
                            <input id="cidade" name="cidade" className="form-control" type="text" placeholder="Cidade" onChange={updateForm}></input>
                        </div>
                        <div className="form-group row">
                            <label className="label" htmlFor="estado">
                                Estado
                            </label>
                            <input id="estado" name="estado" className="form-control" type="text" placeholder="Estado" onChange={updateForm}></input>
                        </div>
                        <div className="form-group row">
                            <label className="label" htmlFor="telefone">
                                Telefone
                            </label>
                            <input id="telefone" name="telefone" className="form-control" type="phone" placeholder="+12 (34) 56789-1011" onChange={updateForm}></input>
                        </div>
                        <div className="form-group row">
                            {renderDays()}

                        </div>
                        <div className="form-group row">
                            <div className="col">
                                <label className="label" htmlFor="hrAbertura">
                                    Hora Abertura
                                </label>
                                <input id="hrAbertura" name="hrAbertura" className="form-control" type="time" value={create[create.activeDay]["hrAbertura"]} onChange={handleDaysForm}></input>
                            </div>
                            <div className="text">
                                até
                            </div>
                            <div className="col">
                                <label className="label" htmlFor="hrAbertura">
                                    Hora Fechamento
                                </label>
                                <input id="hrFechamento" name="hrFechamento" className="form-control" type="time" value={create[create.activeDay]["hrFechamento"]} onChange={handleDaysForm}></input>
                            </div>
                        </div>
                        <button className="btn btn-custom disabled" onClick={null} style = {{ marginLeft:"25%" }}>Cadastrar Barbearia</button>
                    </fieldset>
                </form>
            </div>
            </>
    );

}