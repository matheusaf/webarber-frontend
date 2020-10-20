import { Helmet } from 'react-helmet';
import NavBar from '../NavBar';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Barbearias() {
    let [barbearias, setBarbearias] = useState([]);
    const url = process.env.baseUrl || "http://localhost:8080";
    const user_id = localStorage.getItem('userId');

    // Hooks
    // const tableRow = (obj) => {
    //     return <tr key={`row-${obj.id}`}>
    //         <th scope="row" data-testid={`${obj.id}`} key={`${obj.id}`}>{obj.id}</th>
    //         <td data-testid={obj.name} key={obj.name}>{obj.name}</td>
    //         <td data-testid={obj.specie} key={obj.specie}>{obj.specie}</td>
    //         <button data-testid={`${obj.id}-details-btn`} key={`${obj.id}-details-btn`}
    //             tag={Link} to={{
    //                 pathname:`/details/${obj.id}/`,
    //                 state: obj
    //             }}>Details</button>
    //         <Button data-testid={`${obj.id}-edit-btn`} key={`${obj.id}-edit-btn`} 
    //             tag={Link} to={{
    //                 pathname: `/edit/${obj.id}/`,
    //                 state: obj
    //             }}>Edit</Button>
    //         <Button data-testid={`${obj.id}-delete-btn`} key={`${obj.id}-delete-btn`} color='danger' 
    //             onClick={() => deleteById(obj)}>Delete</Button>
    //     </tr>
    // }

    async function fetchBarbearias() {
        try {
            const res = await fetch(`${url}/barbearias/${user_id}`,{ method: 'get'});
            setBarbearias(await res.json());
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
            </>
    );

}