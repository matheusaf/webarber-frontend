import NavBar from "../NavBar";
import { Helmet } from "react-helmet";
import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Agendamento(){
    return (
        <>
        <Helmet>
            <title>Meus Agendamentos</title>
        </Helmet>
        <NavBar></NavBar>
        <h1 style = {{color:"white", textAlign:"center"}}>
                <Link to="/">
                    Proxima Entrega
                </Link>
        </h1>
        </>
    );
};