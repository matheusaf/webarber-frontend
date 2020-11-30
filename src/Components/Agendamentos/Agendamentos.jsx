import axios from "axios";
import NavBar from "../UI/NavBar/NavBar";
import { Helmet } from "react-helmet";
import React, { useContext, useState, useEffect, useCallback } from "react";
import Loading from "../UI/Loading/Loading";
import { UserContext } from "../User/UserContext";
import AvaliacaoModal from "../Avaliacao/AvaliacaoModal";

const url = process.env.REACT_APP_BASE_URL;

const Agendamentos = () => {
    const { webarberUser } = useContext(UserContext);
    const [agendamento, setAgendamento] = useState([]);
    const [statusAgendamento, setStatusAgendamento] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [idAgendamento, setIdAgendamento] = useState(null);

    const fetchAgendamentos = useCallback( async () => {
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
    }, [webarberUser.sessionToken]); 

    const cancelarAgendamento = async (id) => {
        try {
            const response = await fetch(`${url}/agendamentos`, {
                method: "DELETE",
                body: JSON.stringify({id: id}),
                headers: new Headers({
                    "Content-type" : "application/json", 
                    "Authorization" : `Bearer ${webarberUser.sessionToken}`
                })
            });
            
            if (response.status === 200) {
                await fetchAgendamentos();
            } else {
                let { message } = await response.json();
                alert(message);
            }
        } catch (err) {
            alert(err);
        }
    };

    const finalizarAgendamento = async (id) => {
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


    const fetchStatusAgendamentos = useCallback(async () => {
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
    }, []);

    const buttonStyle = {
        marginTop: "5px",
        marginRight:"10px",
        fontWeight:"bold"
    };

    const renderTableRows = (obj) => {
        return (
                <tr>
                    <td key={obj.id}>{obj.nome_servico}</td>
                    <td key={`${obj.id}-data`}>{obj.data}</td>
                    {webarberUser.idTipo === 2 && <td key={`${obj.id}-user`}>{obj.nome_usuario}</td>}
                    <td key={`${obj.id}-status`}>{statusAgendamento[(obj.id_status-1)]}</td>
                    {webarberUser.idTipo === 1 && obj.id_status === 3 && <button className="btn btn-warning"  style={buttonStyle} onClick={() => { setModalOpen(true); setIdAgendamento(obj.id)}}> 
                                                        Avaliar agendamento
                                                  </button>}
                    {webarberUser.idTipo === 1 && obj.id_status !== 4 && <button className="btn btn-danger" style={buttonStyle} onClick={() => cancelarAgendamento(obj.id)}>
                                                    Cancelar agendamento
                                                  </button>}
                    {webarberUser.idTipo === 2 && <button className="btn btn-danger" style={buttonStyle} onClick={() => finalizarAgendamento(obj.id)}>
                                                    Finalizar agendamento
                                                  </button>}
                </tr>
        );
    };
    const renderPaginaAgendamentos = () => {
        if (agendamento.length > 0){
            return(
                    <table className="table table-dark" style={{margin:"10px auto", maxWidth:"85%", textAlign:"center"}}>
                        <thead style={{backgroundColor:"black", color:"#2bce3b"}}>
                            <tr>
                                <th>Serviço</th>
                                <th>Agendamento</th>
                                {webarberUser.idTipo === 2 && <th>Usuário</th>}
                                <th>Situação</th>
                                <th>Ação</th>
                            </tr>
                        </thead>
                        <tbody>
                            {agendamento.map((a) => renderTableRows(a))}
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
        if(webarberUser){
            fetchAgendamentos();
            fetchStatusAgendamentos();
        }
    }, [webarberUser, fetchAgendamentos, fetchStatusAgendamentos]);

    return (
        <>
            <Helmet>
                <title>Meus Agendamentos</title>
            </Helmet>
            <NavBar></NavBar>
            <h3 style = {{textAlign:"center", color:"#2bce3b"}}> Meus Agendamento </h3>
            {loading && (<Loading/>)}
            {modalOpen && <AvaliacaoModal isOpen={modalOpen} sessionToken={webarberUser.sessionToken} idAgendamento={idAgendamento} setIsOpen={setModalOpen}/>}
            {renderPaginaAgendamentos()}
        </>
    );
}

export default Agendamentos;