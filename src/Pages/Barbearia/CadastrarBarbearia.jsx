import { Helmet } from 'react-helmet';
import NavBar from '../NavBar';
import React, { useState } from 'react';
import './CadastrarBarbearia.css'

export default function CadastrarBarbearia() {
    // Hooks
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
                            <input id="nomeBarbearia" name="nomeBarbearia" className="form-control" type="text" placeholder="Nome Barbearia"></input>
                        </div>
                        <div className="form-group row">
                            <div className="col address">
                                <label className="label" htmlFor="endereco">
                                    Endereço
                                </label>
                                <input id="endereco" name="endereco" className="form-control address" type="text" placeholder="Endereço"></input>
                            </div>
                            <div className="col number">
                                <label className="label" htmlFor="enderecoNumero">
                                    Nº
                                </label>
                                <input id="enderecoNumero" name="enderecoNumero" className="form-control number" type="number" placeholder="Nº"></input>
                            </div>
                        </div>
                        <div className="form-group row">
                            <label className="label" htmlFor="bairro">
                                Bairro
                            </label>
                            <input id="bairro" name="bairro" className="form-control" type="text" placeholder="Bairro"></input>
                        </div>
                        <div className="form-group row">
                            <label className="label" htmlFor="cidade">
                                Cidade
                            </label>
                            <input id="cidade" name="cidade" className="form-control" type="text" placeholder="Cidade"></input>
                        </div>
                        <div className="form-group row">
                            <label className="label" htmlFor="estado">
                                Estado
                            </label>
                            <input id="estado" name="estado" className="form-control" type="text" placeholder="Estado"></input>
                        </div>
                        <div className="form-group row">
                            <label className="label" htmlFor="telefone">
                                Telefone
                            </label>
                            <input id="telefone" name="telefone" className="form-control" type="phone" placeholder="+12 (34) 56789-1011"></input>
                        </div>
                        <button className="btn btn-custom disabled" type="submit" style = {{ marginLeft:"22%" }}>Cadastrar Barbearia</button>
                    </fieldset>

                </form>
            </div>
            </>
    );

}