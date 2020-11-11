import './Home.css'
import NavBar from '../UI/NavBar/NavBar';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import CardBarbearia from '../CardBarbearia/CardBarberia'
// import { fetchBarbeariaNome } from '../Barbearia/Controllers/ControllerBarbearia';

export default function Home() {
    let [barbearias, setBarbearias] = useState([]);
    let [query, setQuery] = useState('')

    const  renderNotFound = () => {
        return (
            <h3 style={{justifyContent:"center",display:"flex", margin:"auto", color:"red", marginTop:"1%", width:"auto"}}> {`Não há barbearia(s) com o nome "${query}"`}</h3>
        )
    }

    const handleOnChange = (event) => {
        setQuery(event.target.value)
    }

    const handleSearch = async (event) =>{
        event.preventDefault();
        // setBarbearias(await fetchBarbeariaNome(query));
    }

    return (
            <>
            <Helmet>
                <title>Home</title>
            </Helmet>
            <NavBar pagina="Home"></NavBar>
            <form>
                <fieldset>
                    <input name="pesquisar" id="pesquisar" className="search-bar" type="search" placeholder="Pesquise uma barbearia" onChange={handleOnChange}></input>
                </fieldset>
                <button className="btn btn-search" type="submit" onClick={handleSearch} disabled={!query}>
                    Pesquisar
                </button>
            </form>
            <div>
                {(barbearias === null)? renderNotFound() : barbearias.map(barbearia => <CardBarbearia barbearia={barbearia}></CardBarbearia>)}
            </div>
            {/* <img src={LukeCage} alt="cage" className="banner"></img> */}
            </>
    );

}
