import NavBar from "../UI/NavBar/NavBar";
import { Helmet } from "react-helmet";
import React from "react";
import { Link } from "react-router-dom";


const Agendamentos = () => {
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
}

export default Agendamentos;