import { Helmet } from 'react-helmet';
import NavBar from '../NavBar';
import React, { useState, useEffect, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import CardBarbearia from './CardBarbearia';
import { fetchBarbeariasModerador } from './Controllers/ControllerBarbearia'
import { UserContext } from '../../UserContext';

export default function Barbearias() {
    const { webarberUser } = useContext(UserContext);
    let [barbearias, setBarbearias] = useState([]);
    let [loading, setLoading] = useState(true);
    
    const getBarbearias = async () => {
        setBarbearias(await fetchBarbeariasModerador(webarberUser.sessionToken, webarberUser.id));
    }

    useEffect(() => {
        getBarbearias();
        setLoading(false);
    }, []);

    const renderNotFound = () => {
        return (
            <h3 style={{justifyContent:"center",display:"flex", margin:"auto", color:"red", marginTop:"1%", width:"auto"}}> {`Você não possui barbearia(s) cadastrada(s).`}</h3>
        )
    }

    return (
            <>
            <Helmet>
                <title>Minhas Barbearias</title>
            </Helmet>
            <NavBar pagina="Minhas Barbearias"></NavBar>
            <Link to="/cadastrarBarbearia">
                <button className="btn btn-custom active" style={{display:"flex", margin:"auto", height:"auto"}}>
                    + Adicionar Barbearia
                </button>
            </Link>
                <div>
                    {barbearias && barbearias.map(barbearia => <><CardBarbearia barbearia={barbearia}> </CardBarbearia><br></br></>)}
                    {!barbearias && renderNotFound()};
                </div>
            </>
    );

}
