import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../../Components/User/UserContext";
import NavBar from "../../Components/UI/NavBar/NavBar";
import Button from "../../Components/UI/Button/Button";
import Input from "../../Components/UI/Forms/Input/Input";
import Loading from "../../Components/UI/Loading/Loading";

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
        password:{
            elementType: "input",
            elementConfig:{
                id: "password",
                name: "password",
                type: "password",
                placeholder: "Senha"
            },
            label:"Senha",
            value:"",
            validation:{

            },
            valid: false,
            touched: false
        },
        touched: false
    });

    const fetchUserData = async () => {
        setLoading(true);
        try{
            let res = await fetch(`${url}/conta`, { method: "get",
                                                    headers: new Headers({"Content-Type":"application/json",
                                                                           "Authorization": `Bearer ${webarberUser.sessionToken}`})});
            if(res.status === 200){
                let data = await res.json();
                setUserData({nome: data.nome, sobrenome: data.sobrenome, email: data.email, password: data.password_hash});
            }
        }
        catch(err){
            alert(err);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleFormChange = (event) => {
        setUserDataForm({...userDataForm, [`${event.target.name}`]: {
            ...userDataForm[`${event.target.name}`], value: [`${event.target.value}`], touched: true
        }, touched:true});
    };

    const handleEditButton = () => {
        setEditMode(true);
    };

    const handleSaveButton = () => {
        setEditMode(false);
    };

    const buttonStyle = {
        marginTop:"10px"
    };

    const renderDadosUsuario = () => {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-title" style={{backgroundColor:"black", display:"flex", justifyContent:"center", color:"#2bce3b", fontWeight:"bold"}}>
                            {webarberUser.nome}
                    </div>
                    <div className="card-body" style={{backgroundColor:"black"}}>
                        <form>
                           {Object.keys(userDataForm).map((field) => 
                                <Input disabled={!editMode} elementType={userDataForm[`${field}`].elementType} 
                                        elementConfig={userDataForm[`${field}`].elementConfig} label={userDataForm[`${field}`].label} 
                                        value={userDataForm[`${field}`].value} handleOnChange={handleFormChange}/>
                                )}
                            {/* {Object.keys(signUpForm).map(field=> 
                            <Input elementType={signUpForm[field].elementType} label={signUpForm[field].label} 
                                value={signUpForm[field].value} elementConfig={signUpForm[field].elementConfig} 
                                options={signUpForm[field].options} handleOnChange={handleOnChange} style={inputStyle}/>)} */}
                        </form>
                        {!editMode ? <Button id="btn editar" buttonStyle={1} buttonText="Editar Perfil" handleOnClick={handleEditButton} style={buttonStyle}/> 
                                    : <Button disabled={!userDataForm.touched} id="btn signup" buttonText="Salvar" handleOnClick={handleSaveButton} style={buttonStyle}/>}
                        {/* <button className={handleEditButtonState()} disabled={editMode} onClick={handleEditButton} >Editar perfil</button> */}
                    </div>
                </div>
            </div>
        );
    };
    
    const autoFillUserData = () => {
        const tempUserDataForm = {...userDataForm};
        Object.keys(userData).map((field) => setUserDataForm({...tempUserDataForm, [`${field}`]: {...tempUserDataForm[`${field}`], value: userData[`${field}`]}}));
    };

    const renderPaginaInvalida = () => {
        return(
            <div>
                <h2 style={{color:"red", display:"flex", justifyContent:"center"}}>{loading?"Loading":"Você não tem acesso à essa página."}</h2>
            </div>
        )
    };

    const renderUserPage = () => {
        if(webarberUser.id === +id){
            return renderDadosUsuario();
        }
        else{
            return renderPaginaInvalida();
        }
    };
    
    return (<div>
        <NavBar></NavBar>
        {!webarberUser && !userData ? <Loading/> : renderUserPage()}
    </div>
    );

};

export default PaginaUsuario;