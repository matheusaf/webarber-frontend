import React, { useState, useEffect, useCallback, useContext } from "react";
import Button from "../UI/Button/Button";
import NavBar from "../UI/NavBar/NavBar";
import Input from "../UI/Forms/Input/Input";
import Loading from "../UI/Loading/Loading";
import { UserContext } from "./../User/UserContext";
import Helmet from "react-helmet";

const url  = process.env.REACT_BASE_URL;

const FiltroUsuario = () => {
    const [userResults, setUserResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState({
        query: {
            elementType: "input",
            elementConfig: {
                id: "queryUsuario" ,
                name:"queryUsuario",
            },
            value: "", 
            valid: false,
            touched: false
        },
        radio: {
            elementType: "input",
            elementConfi: {
                id: "queryRadio",
                name: "queryRadio"
            },
            value: ""
        }
    });

    const fetchUsers = async() => {
        setLoading(true);
        try {
            let req = await fetch(`${url}/filtro?${query.radio.value}=${query.query.value}`, {method:"GET",
                                                headers: new Headers({"Content-Type":"application/json"})});
            if (req.status !== 200){
                alert("Erro ao trazer filtro");
            }
            else{
                let { message } = await req.json();
                alert(message);
            }
        }
        catch(err){
            alert(err);
        }
        setLoading(false);
    };

    const tableRow = (obj) => {
        return (
            <tr key={`row-${obj.id}`}>
                <td data-testid={`valor-${obj.nome}`} key={`valor-${obj.nome}`}>${obj.nome}</td>
                <td data-testid={`valor-${obj.sobrenome}`} key={`valor-${obj.sobrenome}`}>${obj.sobrenome}</td>
                <td data-testid={`valor-${obj.email}`} key={`valor-${obj.email}`}>${obj.email}</td>
                <td data-testid={`valor-${obj.ativo}`} key={`valor-${obj.ativo}`}>${obj.ativo}</td>
                <td data-testid={`valor-${obj.CNPJ}`} key={`valor-${obj.CNPJ}`}>${obj.CNPJ}</td>
                <td data-testid={`valor-${obj.CPF}`} key={`valor-${obj.CPF}`}>${obj.CPF}</td>
                <td data-testid={`valor-${obj.idTipo}`} key={`valor-${obj.idTipo}`}>${obj.idTipo}</td>
            </tr>
        );
    };

    

    const renderTabelaFiltro = () => {
        return(
            <table className="table table-dark" style={{marginTop: "2%", textAlign:"center"}}>
                <thead style={{backgroundColor:"black", color:"#2bce3b", border:"3px solid grey"}}>
                    <tr style={{fontWeight:"bold"}}>
                        <th colSpan="2">Tabela de Serviços</th>
                    </tr>
                    <tr style={{fontWeight:"bold"}}>
                        <th key="nome">Nome</th>
                        <th key="sobrenome">Sobrenome</th>
                        <th key="email">Email</th>
                        <th key="ativo">Ativo</th>
                        <th key="CNPJ">CNPJ</th>
                        <th key="CPF">CPF</th>
                        <th key="Tipo">Tipo</th>
                    </tr>
                </thead>
                <tbody style={{border:"3px solid grey"}}>
                    {userResults && userResults.map((obj) => tableRow(obj))}
                </tbody>
            </table>
        );
    };

    const handleOnChange = (event) => {
        setQuery({...query, [`${event.target.name}`]: {
            ...query[`${event.target.name}`], value: event.target.value, touched: true
        }});
    };

    const handleButton = (event) => {
        if (!radio) return;
        
    };

    const renderResults = () => {

    };

    return(
        <>
            <Helmet>
                <title>
                    Buscar Usuários
                </title>
            </Helmet>
            <div>
                <NavBar/>
            </div>
            <div>
                {loading ? <Loading/> : renderResults()}
                {Object.keys(query).map((field) => <Input elementType={query[`${field}`].elementType} elementConfig={query[`${field}`].elementConfig}
                                                            label={query[`${field}`].label} value={query[`${field}`].value} 
                                                            handleOnChange={handleOnChange}/>)}
                <Button buttonColors={2} buttonText="Buscar" handleOnClick={handleButton} enabled={(radio.value === "" || radio.value === undefined)? false : true}/>
                {renderTabelaFiltro()}
            </div>
        </>
    );
}



export default FiltroUsuario;