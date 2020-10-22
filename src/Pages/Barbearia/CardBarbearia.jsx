import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function CardBarbearia (props){
    return (
        <div className="card">
            <div className="card-body" key={props.obj.id}>
                <div className="card-title">
                    <Link to= {`/barberias?id=${props.obj.id}`}>
                        {props.obj.nome}
                    </Link>
                </div>
                <p>{props.obj.endereco}</p>
                <p>{props.obj.telefone}</p>
            </div>
        </div>
    )
}