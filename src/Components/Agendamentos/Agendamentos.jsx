import axios from "axios";
import NavBar from "../UI/NavBar/NavBar";
import { Helmet } from "react-helmet";
import React, {useContext, useState, useEffect} from "react";
import { Link } from "react-router-dom";
import Loading from "../UI/Loading/Loading";
import { UserContext } from "../User/UserContext";

const url = process.env.REACT_APP_BASE_URL;

const Agendamentos = () => {
    const { webarberUser } = useContext(UserContext);
    const [agendamento, setAgendamento] = useState([]);
    const [statusAgendamento, setStatusAgendamento] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchAgendamentos = async () => {
        setLoading(true);
        try{
            let resp = await fetch(`${url}/agendamentos`, {method:"get", 
                                                          headers: new Headers({"Content-type" : "application/json", 
                                                                                "Authorization" : `Bearer ${webarberUser.sessionToken}`})});
            if(resp.status === 200){
                let data = await resp.json();
                setAgendamento(data);
            }
        }
        catch(err){
            alert(err);
        }
        setLoading(false);
    }; 

    const fetchStatusAgendamentos = async () => {
        try{
            let data = await axios.get(`${url}/statusagendamento`).then((res) => res.data);
            if(data){
                data = data.reduce((arr, data) => [...arr, data.nome], []);
                setStatusAgendamento(data);
            }
        }
        catch(err){
            alert(err);
        }
    }

    const renderTableRows = (obj) => {
        return (
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
        );
    }
    const renderPaginaAgendamentos = () => {
        if(agendamento.length > 0){
            return(
                    <table>
                        <thead>
                            <tr>
                                <th colSpan="3">Meus Agendamentos</th>
                            </tr>
                            <tr>
                                <th>Serviço</th>
                                <th>Agendamento</th>
                                <th>Situação</th>
                            </tr>

                            <tbody>

                            </tbody>
                        </thead>
                    </table>
            );
        }
        else{
            return(
                <h2 className="notFound">
                    Sem agendamentos
                </h2>
            );
        }
    };

    useEffect(() => {
        if(webarberUser){
            fetchStatusAgendamentos();
            
            fetchAgendamentos();
        }
    }, [webarberUser]);

    return (
        <>
        <Helmet>
            <title>Meus Agendamentos</title>
        </Helmet>
        <NavBar></NavBar>
        <h1 style = {{color:"white", textAlign:"center"}}>
            {loading && (<Loading/>)}
            {renderPaginaAgendamentos()}
        </h1>
        </>
    );
}

export default Agendamentos;