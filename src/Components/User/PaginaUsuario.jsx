import "./PaginaUsuario.css";
import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Components/User/UserContext";
import NavBar from "../../Components/UI/NavBar/NavBar";
import Button from "../../Components/UI/Button/Button";
import Input from "../../Components/UI/Forms/Input/Input";
import Loading from "../../Components/UI/Loading/Loading";
import { Helmet } from "react-helmet";
import { setCacheUser } from "../User/Actions/Auth";

const url = process.env.REACT_APP_BASE_URL;

const PaginaUsuario = ()  => {
    const { id } = useParams();
    const { webarberUser } = useContext(UserContext);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState();
    const [userDataForm, setUserDataForm] = useState({
        nome:{
            elementType: "input",
            elementConfig:{
                id: "nome",
                name: "nome",
                type: "text",
                placeholder: "Nome"
            },
            label:"Nome",
            value:"",
            validation:{

            },
            valid: false,
            touched: false
        },
        sobrenome:{
            elementType: "input",
            elementConfig:{
                id: "sobrenome",
                name: "sobrenome",
                type: "text",
                placeholder: "Sobrenome"
            },
            label:"Sobrenome",
            value:"",
            validation:{

            },
            valid: false,
            touched: false
        },
        email:{
            elementType: "input",
            elementConfig:{
                id: "email",
                name: "email",
                type: "email",
                placeholder: "E-mail"
            },
            label:"E-mail",
            value:"",
            validation:{

            },
            valid: false,
            touched: false
        },
        // password:{
        //     elementType: "input",
        //     elementConfig:{
        //         id: "password",
        //         name: "password",
        //         type: "password",
        //         placeholder: "Senha"
        //     },
        //     label:"Senha",
        //     value:"",
        //     validation:{

        //     },
        //     valid: false,
        //     touched: false
        // },
        touched: false,
        autoFilled: false
    });

    const fetchUserData = async () => {
        setLoading(true);
        try{
            let res = await fetch(`${url}/conta`, { method: "get",
                                                    headers: new Headers({"Content-Type": "application/json",
                                                                           "Authorization": `Bearer ${webarberUser.sessionToken}`})});
            if(res.status === 200){
                let data = await res.json();
                setUserData({nome: data.nome, sobrenome: data.sobrenome, email: data.email});
            }
        }
        catch(err){
            alert(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        if(webarberUser){
            fetchUserData();
        }
    }, [webarberUser]);

    const handleFormChange = (event) => {
        setUserDataForm({...userDataForm, [`${event.target.name}`]: {
            ...userDataForm[`${event.target.name}`], value: event.target.value, touched: true
        }, touched:true});
    };

    const handleEditButton = () => {
        setEditMode(true);
    };

    const handleSaveChanges = async () => {
        setEditMode(false);
        try{
            let updatedUser = Object.keys(userDataForm).reduce((obj, prop) => ({...obj, [`${prop}`]: userDataForm[`${prop}`].value }),{});
            updatedUser.CPF = webarberUser.CPF;
            updatedUser.CNPJ = webarberUser.CNPJ;
            let req = await fetch(`${url}/conta`, {method: "PATCH", 
                                                          headers: new Headers({"Content-Type": "application/json",
                                                                                "Authorization": `Bearer ${webarberUser.sessionToken}`}),
                                                         body: JSON.stringify(updatedUser)});
            if(req.status === 200){
                alert("Usuário atualizado com sucesso.");
                webarberUser.nome = updatedUser.nome;
                setCacheUser(webarberUser);
                window.location.reload();
            }
            else{
                let { message } = await req.json();
                alert(message);
            }
        }
        catch(err){
            alert(err);
        }
    };

    const buttonStyle = {
        marginTop:"10px"
    };

    const autoFillUserData = () => {
        let tempUserDataForm = {...userDataForm};
        Object.keys(userData).map((field) => tempUserDataForm = {...tempUserDataForm, 
                            [`${field}`]: {...tempUserDataForm[`${field}`], value: userData[`${field}`]}});
        tempUserDataForm.autoFilled = true;
        setUserDataForm(tempUserDataForm);
    };

    const renderDadosUsuario = () => {
        if(!userDataForm.autoFilled){
            autoFillUserData();
        }
        return (
            <div className="container-user">
                <div className="card">
                    <div className="UserCardTitle">
                        {webarberUser.nome}
                    </div>
                    <div className="card-body" style={{backgroundColor:"black"}}>
                        <form>
                           {Object.keys(userDataForm).map((field) => 
                                <Input disabled={!editMode} elementType={userDataForm[`${field}`].elementType} 
                                        elementConfig={userDataForm[`${field}`].elementConfig} label={userDataForm[`${field}`].label} 
                                        value={userDataForm[`${field}`].value} handleOnChange={handleFormChange}/>
                                )}
                        </form>
                        {!editMode ? <Button id="btn editar" buttonStyle={1} buttonText="Editar Perfil" handleOnClick={handleEditButton} style={buttonStyle}/> 
                                    : <Button disabled={!userDataForm.touched} id="btn signup" buttonText="Salvar" handleOnClick={handleSaveChanges} style={buttonStyle}/>}
                    </div>
                </div>
            </div>
        );
    };

    const renderPaginaInvalida = () => {
        return(
            <div>
                <h2 style={{color:"red", display:"flex", justifyContent:"center"}}>{loading?"Loading":"Você não tem acesso à essa página."}</h2>
            </div>
        );
    };

    const renderUserPage = () => {
        if(webarberUser.id === +id){
            return renderDadosUsuario();
        }
        else{
            return renderPaginaInvalida();
        }
    };
    
    return (
        <>
            <Helmet>
                <title>
                    Meu usuário
                </title>
            </Helmet>
            <div>
                <NavBar></NavBar>
                {!webarberUser || !userData ? <Loading/> : renderUserPage()}
            </div>
        </>
    );

};

export default PaginaUsuario;