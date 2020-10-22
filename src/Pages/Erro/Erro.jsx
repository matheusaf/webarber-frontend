import Helmet from 'react-helmet';
import React, { useState } from 'react'; 
import { Redirect, useHistory } from 'react-router-dom';

export default function Erro(){
    return (
        <>
        <Helmet>
            <title>Erro</title>
        </Helmet>
        <h1 className="h1-erro" >Erro</h1>
        <a className="a-erro" ref={useHistory().goBack()}> Voltar </a>
        </>
    )
}