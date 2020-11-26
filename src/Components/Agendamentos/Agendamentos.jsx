import axios from "axios";
import NavBar from "../UI/NavBar/NavBar";
import { Helmet } from "react-helmet";
import React, {useContext, useState, useEffect} from "react";
import { Link, useHistory } from "react-router-dom";
import Loading from "../UI/Loading/Loading";
import { UserContext } from "../User/UserContext";

const url = process.env.REACT_APP_BASE_URL;

const Agendamentos = () => {
    const { webarberUser } = useContext(UserContext);
    const [agendamento, setAgendamento] = useState([]);
    const [statusAgendamento, setStatusAgendamento] = useState([]);
    const [loading, setLoading] = useState(false);
    const history = useHistory();


    const fetchAgendamentos = async () => {
        setLoading(true);
        try{
            let resp = await fetch(`${url}/agendamentos`, {method:"get", 
                                                          headers: new Headers({"Content-type" : "application/json", 
                                                                                "Authorization" : `Bearer ${webarberUser.sessionToken}`})});
            if (resp.status === 200) {
                let data = await resp.json();
                setAgendamento(data);
            }
        }
        catch(err){
            alert(err);
        }
        setLoading(false);
    }; 

    const cancelarAgendamento = async ({ id }) => {
        try {
            const response = await fetch(`${url}/agendamentos`, {
                method: "delete",
                body: JSON.stringify({id}),
                headers: new Headers({
                    "Content-type" : "application/json", 
                    "Authorization" : `Bearer ${webarberUser.sessionToken}`
                })
            });
            
            if (response.status === 200) {
                await fetchAgendamentos();
            } else {
                alert("Erro ao cancelar o agendamento");
            }
        } catch (err) {
            alert(err);
        }
    };

    const finalizarAgendamento = async ({ id }) => {
        try {
            const response = await fetch(`${url}/agendamentos`, {
                method: "patch",
                body: JSON.stringify({ id, idStatus: 3}),
                headers: new Headers({
                    "Content-type" : "application/json", 
                    "Authorization" : `Bearer ${webarberUser.sessionToken}`
                })
            });
            
            if (response.status === 200) {
                await fetchAgendamentos();
            } else {
                alert("Erro ao cancelar o agendamento");
            }
        } catch (err) {
            alert(err);
        }
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
                    <td key={obj.id}>{obj.nome_servico}</td>
                    <td key={`${obj.id}-data`}>{obj.data}</td>
                    {webarberUser.idTipo === 2 && <td key={`${obj.id}-user`}>{obj.nome_usuario}</td>}
                    <td key={`${obj.id}-status`}>{statusAgendamento[(obj.id_status-1)]}</td>
                    {webarberUser.idTipo === 1 && <button className="btn btn-danger" onClick={() => cancelarAgendamento(obj.id)}>Cancelar agendamento</button>}
                    {webarberUser.idTipo === 1 && <button className="btn btn-warning" onClick={() => { localStorage.setItem("nome_servico", obj.nome_servico); history.pushState(); }}> Avaliar agendamento</button>}
                    {webarberUser.idTipo === 2 && <button className="btn btn-danger" onClick={() => finalizarAgendamento(obj.id)}> Finalizar agendamento</button>}
                </tr>
        );
    }
    const renderPaginaAgendamentos = () => {
        if (agendamento.length > 0){
            return(
                    <table className="table table-dark">
                        <thead>
                            <tr>
                                <th style={{textAlign: "center"}} colSpan="5">Meus Agendamentos</th>
                            </tr>
                            <tr>
                                <th>Serviço</th>
                                <th>Agendamento</th>
                                {webarberUser.idTipo === 2 && <th>Usuário</th>}
                                <th>Situação</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agendamento.map((agend) => renderTableRows(agend))}
                        </tbody>
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
        if (webarberUser) {            
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
        <h1 style = {{color:"white", textAlign:"center"}}> Agendamento </h1>
        {loading && (<Loading/>)}
        {renderPaginaAgendamentos()}
        </>
    );
}

export default Agendamentos;