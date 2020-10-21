import './Home.css'
import LukeCage from './Images/luke-cage-at-pops-barbershop.png'
import NavBar from '../NavBar';
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';


export default function Home() {
    // Hooks
    let [barbearias, setBarbearias] = useState([]);
    let [filter, setFilter] = useState();
    
    const url = "https://webarber-back-dev.herokuapp.com";
    const user_id = localStorage.getItem('userId');

    // Hooks
    const renderBarbearia = (obj) => {
        return (
                <tr key={`row-${obj.id}`}>
                    <th scope="row" data-testid={`${obj.id}`} key={`${obj.id}`}> 
                       <Link to="/barbearias">
                            {obj.nome}
                        </Link> 
                     </th>
                    <td data-testid={obj.horarioAbertura} key={obj.horarioAbertura}>{obj.horarioAbertura}</td>
                    <td data-testid={obj.horarioFechamento} key={obj.horarioFechamento}>{obj.horarioFechamento}</td>
                </tr>
        )
    }


    async function fetchBarbearias() {
        try {
            const res = await fetch(`${url}/barbearias/`,{ method: 'get'});
            setBarbearias(await res.json());
        } catch (err) {
            console.log(err);
        }
    }

    // ComponentDidMount - fetch
    // ComponentDidUpdate
    useEffect(() => {
        fetchBarbearias();
    	return () => console.log('removing effect');
    }, []);
/*
    useEffect(() => {
        fetchBarbearias();
    	return () => console.log('removing effect');
    }, []);
*/

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
            <table className="table table-hover table-dark" style={{marginTop:"2%"}}>
                    <thead>
                        <tr>
                            <th key="nome">Nome</th>
                            <th key="hora-abertura">Hora de abertura</th>
                            <th key="hora-fechamento">Hora de fechamento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {barbearias && barbearias.map(barberia => renderBarbearia(barberia))}
                    </tbody>
                </table>
            {/* <img src={LukeCage} alt="cage" className="banner"></img> */}
            </>
    );

}
