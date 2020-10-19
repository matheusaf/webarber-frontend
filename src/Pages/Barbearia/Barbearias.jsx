import { Helmet } from 'react-helmet';
import NavBar from '../NavBar';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Barbearias() {
    // Hooks
    return (
            <>
            <Helmet>
                <title>Minhas Barbearias</title>
            </Helmet>
            <NavBar></NavBar>
            <Link to="/cadastrarBarbearia">
                <button className="btn btn-custom active" style={{marginLeft:"45%"}}>
                    Adicionar Barbearia
                </button>
            </Link>
            </>
    );

}