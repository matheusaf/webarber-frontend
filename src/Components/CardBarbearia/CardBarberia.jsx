import React from 'react';
import { Link } from 'react-router-dom';
import './CardBarbearia.css'
import logo from "../../images/logo.png"

export default function CardBarbearia ({barbearia}){
    return (
        <div className="card barber">
            <Link to= {`/barbearias/${barbearia.id}`}>
                <div className="card-body" key={barbearia.id}>
                    <div className="card-title">
                            {barbearia.nome}
                    </div>
                    <div>
                        <img className="card-img-left"  src={logo} alt={`image of ${barbearia.nome}`}></img>
                    </div>
                    <div className="row">
                        <div className="col label">
                            <p className="card-text label">
                                Endereço:
                            </p>
                        </div>
                        <div className="col data">
                            {/* <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURI(barbearia.endereco)}`} target="_blank" rel="noopener noreferrer"> */}
                                <p className="card-text data">
                                    {barbearia.endereco}
                                </p>
                            {/* </a> */}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col label">
                            <p className="card-text label">
                                Telefone:
                            </p>
                        </div>
                        <div className="col data">
                            <p className="card-text data">
                                {barbearia.telefone}
                            </p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col label">
                            <p className="card-text label">
                                Funcionamento:
                            </p>
                        </div>
                        <div className="col data">
                            <p className="card-text data">
                                {new Date(barbearia.horarioAbertura).toLocaleTimeString([], {hour: "2-digit", minute:"2-digit", hour12:false})}-{new Date(barbearia.horarioFechamento).toLocaleTimeString([], {hour:"2-digit", minute:"2-digit", hour12:false})}
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}