import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { UserContext } from '../../UserContext';
import {fetchUserData } from './Controllers/UserController';
import NavBar from '../NavBar';

export default function PaginaUsuario(){
    const { webarberUser } = useContext(UserContext);
    const [userData, setUserData] = useState();
    const { id } = useParams();
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchData = async() => {
        let data = await fetchUserData(webarberUser.sessionToken, id);
        setUserData(data);
        setLoading(false);
    }

    useEffect(()=>{
        fetchData();
    }, [])

    const handleFormChange = (event) => {
        setUserData({...userData, [event.target.name]: [event.target.value]})
    }

    const handleEditButtonState = () => {
        return `btn btn-custom ${(!editMode)? "active" : "disabled"}`;
    }

    const handleEditButton = () =>{
        setEditMode(true);
    }

    const renderDadosUsuario = () => {
        const buttonStyle = {width:"70px"}
        return (
            <div className="container">
                <div className="card">
                    <div className="card-title">
                        <div>
                            Seu perfil
                        </div>
                    </div>
                    <div className="card-body">
                        <form>
                            <div className="form-row">
                                <input id="nome" name="nome" className="form-control" disabled={!editMode} value={userData.nome} placeholder="Digite seu nome" onChange={handleFormChange} style={buttonStyle}></input>
                            </div>
                            <div className="form-row">
                                <input id="sobrenome" name="sobrenome" className="form-control" disabled={!editMode} value={userData.sobrenome} placeholder="Digite seu sobrenome" onChange={handleFormChange} style={buttonStyle}></input>
                            </div>
                            <div className="form-row">
                                <input id="email" name="email" className="form-control" disabled={!editMode} value={userData.email} placeholder="Digite seu novo email" onChange={handleFormChange} style={buttonStyle}></input>
                            </div>
                            <div className="form-row">
                                <input id="password" name="password" className="form-control" disabled={!editMode} value={userData.password_hash} type="password" placeholder="Digite sua nova senha" onChange={handleFormChange} style={buttonStyle}></input>
                            </div>
                            <div className="form-row">
                                <input id={userData.CPF ? "CPF":"CNPJ"} name={userData.CPF ? "CPF":"CNPJ"} className="form-control" disabled={!editMode} value={userData.CPF? userData.CPF: userData.CNPJ } placeholder="Digite seu CPF" onChange={handleFormChange} style={buttonStyle}></input>
                            </div>
                        </form>
                        <button className={handleEditButtonState()} disabled={editMode} onClick={handleEditButton} style>Editar perfil</button>
                    </div>
                {/* {editMode && <button onClick={true}>salvar</button>} */}
                </div>
            </div>
        )
    }
    
    const renderPaginaInvalida = () => {
        return(
            <div>
                <h2 style={{color:"red", display:"flex", justifyContent:"center"}}>{loading?"Loading":"Você não tem acesso à essa página."}</h2>
            </div>
        )
    }
    
    return (<div>
        <NavBar></NavBar>
        {(!loading && userData && userData.id === +id)?renderDadosUsuario(): renderPaginaInvalida()}
    </div>
    )

}