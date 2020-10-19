import './Home.css'
import LukeCage from './Images/luke-cage-at-pops-barbershop.png'
import NavBar from '../NavBar';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

export default function Menu() {
    // Hooks
    return (
            <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <NavBar></NavBar>
            <form>
                <fieldset>
                    <input className="search-bar" type="search" placeholder="Procure a barbearia"></input>
                </fieldset>
            </form>
            {/* <img src={LukeCage}></img> */}
            </>
    );

}
