import { Helmet } from 'react-helmet';
import NavBar from '../NavBar';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CardBarbearia from './CardBarbearia';

export default function Barbearias() {
    let [barbearias, setBarbearias] = useState([]);
    const url = "https://webarber-back-dev.herokuapp.com";
    const user_id = localStorage.getItem('userId');

    // Hooks
    // const renderBarbearia = (obj) => {
    //     return (
    //             <tr key={`row-${obj.id}`}>
    //                 <th scope="row" data-testid={`${obj.id}`} key={`${obj.id}`}> 
    //                    <Link to="/barbearias">
    //                         {obj.nome}
    //                     </Link> 
    //                  </th>
    //                 <td data-testid={obj.horarioAbertura} key={obj.horarioAbertura}>{obj.horarioAbertura}</td>
    //                 <td data-testid={obj.horarioFechamento} key={obj.horarioFechamento}>{obj.horarioFechamento}</td>
    //             </tr>
    //     )
    // }


    async function fetchBarbearias() {
        try {
            const res = await fetch(`${url}/barbearias/moderador/${user_id}`,{ method: 'get'});
            if(res.status === 200){
                let data = await res.json();
                if(data[0] === undefined){
                    data = [data];
                }
                setBarbearias([...data]);
                
            }
        } catch (err) {
            console.log(err);
        }
    }

    // ComponentDidMount - fetch
    // ComponentDidUpdate
    useEffect(() => {
        fetchBarbearias();
    });
    //só atualiza se o state mudar  ex: [data] --> (prevState !== state)? setData : continue

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
                {/* <table className="table table-hover table-dark" style={{marginTop:"2%"}}>
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
                </table> */}
                <>
                    {barbearias && barbearias.map(barberia => <CardBarbearia obj={barberia}></CardBarbearia>)}
                </>
            </>
    );

}