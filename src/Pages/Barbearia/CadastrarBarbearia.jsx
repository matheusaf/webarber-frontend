import { Helmet } from 'react-helmet';
import NavBar from '../NavBar';
import React, { useState } from 'react';
import './CadastrarBarbearia.css'

export default function CadastrarBarbearia() {
    const [create, setCreate] = useState({
        nome: '', endereço: '', enderecoNumero: '', bairro: '',
        cidade: '', estado: '', telefone: '', horarioAbertura: '10:10:10', horarioFechamento: '22:22:22', user_id: Number(localStorage.getItem('userId'))
        // activeDay: "Seg",
        // Seg: {hrAbertura: '', hrFechamento:''},
        // Ter: {hrAbertura: '', hrFechamento:''},
        // Qua: {hrAbertura: '', hrFechamento:''},
        // Qui: {hrAbertura: '', hrFechamento:''},
        // Sex: {hrAbertura: '', hrFechamento:''},
        // Sab: {hrAbertura: '', hrFechamento:''},
        // Dom: {hrAbertura: '', hrFechamento:''}
    });

    const updateForm = (event) => setCreate({ ...create, [event.target.name]: event.target.value });

    // const handleDaysButton = (event) =>{
    //     event.preventDefault();
    //     setCreate({...create, activeDay: event.target.name})
    // }

    // const handleDaysForm = (event) =>{
    //     if (create.activeDay ===  null)
    //         alert("Selecionar uma data");
    //     else{
    //         setCreate({ ...create, [create.activeDay]:{...create[create.activeDay], [event.target.name]: event.target.value}});
    //     }
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // create.endereco = [create.rua, create.enderecoNumero, create.bairro, create.cidade, create.estado].join(',');
        try {
            let horarioAbertura = new Date();
            horarioAbertura.setHours(...create.horarioAbertura.split(':'));
            create.horarioAbertura = horarioAbertura;

            let horarioFechamento = new Date();
            horarioFechamento.setHours(...create.horarioFechamento.split(':'));
            create.horarioFechamento = horarioFechamento

            const url = "https://webarber-back-dev.herokuapp.com"
            const response = await fetch(`${url}/barbearias`, {
                method: "post",
                headers: new Headers({ 'Content-Type': 'application/json' }),
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

    // const renderDays = () => {
    //     const days = ["Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"];
    //     return (
    //         <>
    //         {days.map(day => 
    //         <div className="col-xs day">
    //             <button id={day} name={day} className={`btn btn-day ${create.activeDay == day ? 'active' : 'disabled'}`} onClick={handleDaysButton}>{day}</button>
    //         </div>)}
    //         </>)
    // }

    return (
        <>
            <Helmet>
                <title>Cadastrar barbearia</title>
            </Helmet>
            <NavBar></NavBar>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <div className="form-group row">
                            <label className="label" htmlFor="nomeBarbearia">
                                Nome Barbearia
                    </label>
                            <input id="nomeBarbearia" name="nome" className="form-control" type="text" placeholder="Nome Barbearia" onChange={updateForm} value={create.nome} > </input>
                        </div>
                        <div className="form-group row">
                            <div className="col address">
                                <label className="label" htmlFor="endereco">
                                    Endereço
                        </label>
                                <input id="endereco" name="endereco" className="form-control address" type="text" placeholder="Endereço" onChange={updateForm} value={create.endereco}></input>
                            </div>
                            <div className="col number">
                                <label className="label" htmlFor="enderecoNumero">
                                    Nº
                        </label>
                                <input id="enderecoNumero" name="enderecoNumero" className="form-control number" type="number" placeholder="Nº" onChange={updateForm} value={create.enderecoNumero}></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="label" htmlFor="bairro">
                                Bairro
                    </label>
                            <input id="bairro" name="bairro" className="form-control" type="text" placeholder="Bairro" onChange={updateForm} value={create.bairro}></input>
                        </div>
                        <div className="form-group row">
                            <label className="label" htmlFor="cidade">
                                Cidade
                    </label>
                            <input id="cidade" name="cidade" className="form-control" type="text" placeholder="Cidade" onChange={updateForm} value={create.cidade}></input>
                        </div>
                        <div className="form-group row">
                            <label className="label" htmlFor="estado">
                                Estado
                    </label>
                            <input id="estado" name="estado" className="form-control" type="text" placeholder="Estado" onChange={updateForm} value={create.estado}></input>
                        </div>
                        <div className="form-group row">
                            <label className="label" htmlFor="telefone">
                                Telefone
                    </label>
                            <input id="telefone" name="telefone" className="form-control" type="phone" placeholder="+12 (34) 56789-1011" onChange={updateForm} value={create.telefone}></input>
                        </div>

                        <div className="form-group row">
                            <div className="col">
                                <label className="label" htmlFor="hrAbertura">
                                    Hora Abertura
                        </label>
                                <input id="hrAbertura" name="horarioAbertura" className="form-control" type="time" value={create.horarioAbertura} onChange={updateForm}></input>
                            </div>
                            <div className="text">
                                até
                    </div>
                            <div className="col">
                                <label className="label" htmlFor="horarioFechamento">
                                    Hora Fechamento
                        </label>
                                <input id="hrFechamento" name="horarioFechamento" className="form-control" type="time" value={create.horarioFechamento} onChange={updateForm}></input>
                            </div>
                        </div>
                        <button className="btn btn-custom disabled" onClick={null} style={{ marginLeft: "25%" }}>Cadastrar Barbearia</button>
                    </fieldset>
                </form>
            </div>
        </>
    );

}

// <div className="form-group row">
//     {renderDays()}
// </div>