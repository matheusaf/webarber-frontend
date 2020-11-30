import React from "react";
import { Link } from "react-router-dom";
import "./CardBarbearia.css";
import logo from "../../../images/logo.png";

const CardBarbearia = ({barbearia}) => {

    const imgStyle = {
        width: "120px",
        height: "120px",
        display: "flex",
        margin: "auto auto"
    };
    
    return (
        <div className="card barber">
                <div className="card-body" key={barbearia.id}>
                    <div className="card-title" style={{display:"flex", justifyContent:"center"}}>
                            <Link to= {`/barbearia/${barbearia.id}`}>
                                {barbearia.nome}
                            </Link>                
                    </div>
                    <div>
                        <Link to= {`/barbearia/${barbearia.id}`}>
                            <img className="card-img" src={logo} alt="" style={imgStyle}></img>
                        </Link>
                    </div>
                    <div className="row">
                        <div className="col label">
                            <p className="card-text label">
                                Endereço:
                            </p>
                        </div>
                        <div className="col data">
                            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURI(barbearia.endereco)}`} target="_blank" rel="noopener noreferrer">
                                {barbearia.endereco}
                            </a>
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
        </div>
    );
};

export default CardBarbearia;