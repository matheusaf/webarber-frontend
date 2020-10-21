import './Home.css'
import LukeCage from './Images/luke-cage-at-pops-barbershop.png'
import NavBar from '../NavBar';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';

export default function Home() {
    // Hooks
    const renderBarbershop = () => {

    }
    const handleSearch = async (event) =>{
        event.preventDefault();
        console.log(event.target.value);
        const url = `http://localhost:8080/barbearias/nome=${event.target.value}`;
        try {
            let response = await fetch(url, {
                method: "get",
                headers: new Headers({'Content-Type': 'application/json'}),
            });
            if (response.status !== 200) {
                throw new Error(response.status);
            }
            response = await response.json();
        } catch(err) {
            console.log(err);
        }
    }
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
                <button className="btn btn-search" type="submit" onClick={handleSearch}>
                    Pesquisar
                </button>
            </form>
            {/* <img src={LukeCage} alt="cage" className="banner"></img> */}
            </>
    );

}