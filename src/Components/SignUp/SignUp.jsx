import Helmet from "react-helmet";
import Button from "../UI/Button/Button";
import Input from "../UI/Forms/Input/Input";
import { useHistory } from "react-router-dom";
import React, { useState } from "react";
import ImageHeader from "../UI/ImageHeader/ImageHeader";
import { Link } from "react-router-dom";
import Loading from "../UI/Loading/Loading";

const url = process.env.REACT_APP_BASE_URL;

const SignUp = ({email, password}) => {
    let history = useHistory();
    const [loading, setLoading] = useState(false);
    // const [alertMessage, setAlertMessage] = useState(null);
    const maskNumDocumento = {CPF: {mask:"999.999.999-99", placeholder: "123.456.789.10"}, 
                              CNPJ: {mask: "99.999.999/9999-9", placeholder: "12.345.789/000-0"}};
    const[signUpForm, setSignUpForm] = useState ({
        nome:{
            elementType: "input",
            elementConfig:{
                id:"nome",
                name:"nome",
                type:"text",
                placeholder:"Nome"
            },
            label: "Nome",
            value: "",
            validation: {

            },
            valid: false,
            touched: false
        },
        sobrenome:{
            elementType: "input",
            elementConfig:{
                id:"sobrenome",
                name:"sobrenome",
                type:"text",
                placeholder:"Sobrenome"
            },
            label: "Sobrenome",
            value: "",
            validation: {

            },
            valid: false,
            touched: false
        },
        tipoPessoa:{
            elementType: "select",
            elementConfig:{
                id:"tipoPessoa",
                name:"tipoPessoa",
                placeholder:"Tipo Pessoa",
                options:[
                    {optionValue: "CPF", optionText: "Pessoa Física"},
                    {optionValue: "CNPJ", optionText: "Pessoa Jurídica"}
                ],
            },
            label: "Tipo Pessoa",
            value: "",
            validation: {

            },
            valid: false,
            touched: false
        },          
        numDocumento:{
            elementType: "input",
            elementConfig:{
                id:"numDocumento",
                name:"numDocumento",
                type:"text",
                placeholder: maskNumDocumento["CPF"].placeholder,
                mask: maskNumDocumento["CPF"].mask
            },
            label: "CPF",
            value: "",
            validation: {

            },
            valid: false,
            touched: false
        },
        idTipo:{
            elementType: "select",
            elementConfig:{
                id:"idTipo",
                name:"idTipo",
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
        email:{
            elementType: "input",
            elementConfig:{
                id:"email",
                name:"email",
                type:"text",
                placeholder:"E-mail"
            },
            label: "E-mail",
            value: ""
        },     
        confirmacaoEmail:{
            elementType: "input",
            elementConfig:{
                id:"confirmacaoEmail",
                name:"confirmacaoEmail",
                type:"email",
                placeholder:"Confirme o e-mail"
            },
            label: "Confirme seu email",
            value: "",
            validation: {},
            valid: false,
            touched: false
        },     
        password:{
            elementType: "input",
            elementConfig:{
                id:"password",
                name:"password",
                type:"password",
                placeholder: "Senha"
            },
            label: "Senha",
            value: "",
            validation: {},
            valid: false,
            touched: false
        },     
        confirmacaoPassword:{
            elementType: "input",
            elementConfig:{
                id:"confirmacaoPassword",
                name:"confirmacaoPassword",
                type:"password",
                placeholder: "Confirme a senha"
            },
            label: "Confirme sua senha",
            value: "",
            validation: {},
            valid: false,
            touched: false
        }
    });
    
    const handleSignUp = async() => {
        setLoading(true);
        try{
            let newUser = Object.keys(signUpForm).reduce((user, key) => ({...user, [`${key}`]: signUpForm[`${key}`].value}),{});
            newUser = {...newUser, [`${newUser.tipoPessoa}`]: newUser.numDocumento,[newUser.tipoPessoa==="CPF"?"CNPJ":"CPF"] : null};
            let response = await fetch(`${url}/cadastro`, { method: "post", 
                                                            headers: new Headers({ "Content-Type": "application/json"}),
                                                            body:  JSON.stringify(newUser)
                                                          }
            );
            if(response.status === 201){
                alert("Cadastro realizado com sucesso.");
                history.push("/login");
            }
            else{
                let { message } = await response.json();
                alert(message);
            }
        }
        catch(err){
            alert(err);
        }
        setLoading(false);
    };

    const handleOnClick = async (event) => {
        event.preventDefault();
        await handleSignUp();
    };

    // const validateFields = () =>{
    //     let valid = false;
    //     if(valid){
    //         setAlertMessage()
    //     }
    //     else if(signUpForm.password.value === signUpForm.confirmacaoPassword.value){
    //         setAlertMessage("Senhas não são iguais");
    //     }
    //     else if(signUpForm.email.value === signUpForm.confirmacaoEmail.value){
    //         setAlertMessage("Senhas não são iguais");
    //     }  
    //     else if(signUpForm.tipoPessoa.value === "CPF" && signUpForm.numDocumento.replace(".","").replace("_", "").length<11){
    //         setAlertMessage("Preencher com um CPF válido");
    //     }
    //     else if(signUpForm.tipoPessoa.value === "CNPJ" && signUpForm.numDocumento.replace(".","").replace("_", "").replace("/", "").length <12){
    //         setAlertMessage("Preencher com um CNPJ válido");
    //     }
    //     setAlertMessage(null);
    //     valid = true;
    //     return valid;
    // }

    const handleOnChange = (event) => {
            if(event.target.name === "tipoPessoa") {
                setSignUpForm({...signUpForm, [`${event.target.name}`]:{ 
                    ...signUpForm[`${event.target.name}`], value: event.target.value, 
                    },
                    numDocumento:{
                        ...signUpForm.numDocumento, label: event.target.value,
                        elementConfig:{
                            ...signUpForm.numDocumento.elementConfig, mask: maskNumDocumento[`${event.target.value}`].mask,
                            placeholder: maskNumDocumento[`${event.target.value}`].placeholder
                        }

                    }, 
                });
            }
            else{
                setSignUpForm({...signUpForm, [`${event.target.name}`]:{ 
                    ...signUpForm[`${event.target.name}`], value: event.target.value}});
            }
    };

    const inputStyle = {
        width:"50%", 
        display:"flex", 
        margin:"auto auto"
    };
    
    const renderSignUpForm = () => {
        return(
                <div>
                    <div className="container">
                        <ImageHeader/>
                        {Object.keys(signUpForm).map((field) => 
                                <Input elementType={signUpForm[`${field}`].elementType} label={signUpForm[`${field}`].label} 
                                value={signUpForm[`${field}`].value} elementConfig={signUpForm[`${field}`].elementConfig} 
                                options={signUpForm[`${field}`].options} handleOnChange={handleOnChange} style={inputStyle}/>)}
                    </div>
                    <div className="a form">
                        <Link to="/login">
                            Já é cadastrado?
                        </Link>
                    </div>
                    <div>
                        <Button id="btn signup" buttonText="Cadastrar" handleOnClick={handleOnClick}/>
                    </div>
                </div>
        );
    };

    return (
        <>
            <Helmet>
                <title>Webarber - Cadastro usuário</title>
            </Helmet>
           {loading ? <Loading/> : renderSignUpForm()}
        </>
     );
    }; 
    
export default SignUp;