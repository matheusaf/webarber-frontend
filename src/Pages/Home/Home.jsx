import './Home.css'
import LukeCage from './Images/luke-cage-at-pops-barbershop.png'
import NavBar from '../NavBar';
import React from 'react';
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
                    <input name="pesquisar" id="pesquisar" className="search-bar" type="search" placeholder="Pesquise uma barbearia"></input>
                </fieldset>
                <button className="btn btn-search" type="submit">
                    Pesquisar
                </button>
            </form>
            <img src={LukeCage} alt="cage" className="banner"></img>
            </>
    );

}