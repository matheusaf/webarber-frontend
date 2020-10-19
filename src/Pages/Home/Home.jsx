import './Home.css'
import LukeCage from './Images/luke-cage-at-pops-barbershop.png'
import NavBar from '../NavBar';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

export default function Home() {
    // Hooks
    return (
            <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <NavBar></NavBar>
            <form>
                <fieldset>
                    <input className="search-bar" type="search" placeholder="Procure uma barbearia"></input>
                </fieldset>
                <button className="btn search" type="submit">
                    Buscar
                </button>
            </form>
            <img src={LukeCage} className="banner"></img>
            </>
    );

}