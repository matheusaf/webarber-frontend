import React, { useState, useEffect, useContext, useCallback } from "react";
import Button from "../UI/Button/Button";
import NavBar from "../UI/NavBar/NavBar";
import Input from "../UI/Forms/Input/Input";
import Loading from "../UI/Loading/Loading";
import { UserContext } from "./../User/UserContext";
import Helmet from "react-helmet";

const url  = process.env.REACT_BASE_URL;

const FiltroUsuario = () => {
    const { webarberUser } = useContext(UserContext);
    const [userResults, setUserResults] = useState([]);
    const [buttonEnabled, setButtonEnabled] = useState(false);
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState({
        tipoUsuario:{
            elementType: "select",
            elementConfig:{
                id:"tipoUsuario",
                name:"tipoUsuario",
                placeholder: "Escolha o tipo de usuário",
                options:[
                    {optionValue: "1", optionText: "Usuário"},
                    {optionValue: "2", optionText: "Moderador"}
                ],
            },
            label: "Tipo Usuário",
            value: "",
            validation: {},
            valid: false,
            touched: false
        },
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
        },
    });

    const fetchUsers = useCallback(async() => {
        setLoading(true);
        try {
            let req = await fetch(`${url}/filtro?${query.tipoUsuario.value}=${query.query.value}`, {method:"GET",
                                                headers: new Headers({"Content-Type":"application/json"})});
            if (req.status !== 200){
                alert("Não foi possível filtrar os usuários")
            }
            else{
                let json = await req.json();
                setUserResults(json);
            }
        }
        catch(err){
            alert(err);
        }
        setLoading(false);
    }, [query]);

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


    useEffect(() => {
        if(webarberUser){
            setButtonEnabled(true);
        }
    }, [webarberUser, setButtonEnabled]);

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
                <Button disabled={!buttonEnabled} buttonColors={2} buttonText="Buscar" handleOnClick={fetchUsers()}/>
                {renderTabelaFiltro()}
            </div>
        </>
    );
}



export default FiltroUsuario;