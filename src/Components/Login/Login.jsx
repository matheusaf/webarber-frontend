import "./Login.css";
import Helmet from "react-helmet";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Input from "../UI/Forms/Input/Input";
import Button from "../UI/Button/Button";
import AlertBox from "../UI/AlertBox/AlertBox";
import Loading from "../UI/Loading/Loading";
import ImageHeader from "../UI/ImageHeader/ImageHeader";
import { Link } from "react-router-dom";
import { setCacheUser } from "../User/Actions/Auth";
const url = process.env.REACT_APP_BASE_URL;

const Login = (props) => {
    // const { setWebarberUser } = useContext(UserContext);
    let history = useHistory();
    const [alertMessage, setAlertMessage ] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loginForm, setLoginForm] = useState(
    {
            email:{
                elementType: "input",
                elementConfig:{
                    id: "email",
                    name:"email",
                    type: "text",
                    placeholder: "E-mail"
                },
                label: "E-mail",
                value: ""
            },
            password:{
                elementType: "input",
                elementConfig:{
                    id: "password",
                    name:"password",
                    type: "password",
                    placeholder: "Senha",
                    minLength:"8"
                },
                label: "Senha",
                value: ""
            }
        });

    const handleLogin = async() => {
        setAlertMessage(null);
        setLoading(true);
        let user = {email: loginForm.email.value, password: loginForm.password.value};
        try{
            let response = await fetch(`${url}/login`, { method:"post",
                                headers: new Headers(
                                {"Content-Type": "application/json"}),
                                body: JSON.stringify(user)
                            }
            );
            if(response.status === 200){
                let user = await response.json();
                setCacheUser(user);
                history.push("/");
                window.location.reload();
            }
            else{
                let {message} = await response.json();
                setAlertMessage(message);
            }
        }
        catch(err){
            alert(err);
        }
        setLoading(false);
    };

    const handleOnChange = (event) => {
        setLoginForm({...loginForm, [`${event.target.name}`]:{ 
                ...loginForm[`${event.target.name}`], value: event.target.value}});
    };
  
    const inputStyle = {
        width:"50%", 
        display:"flex", 
        margin:"auto auto"
    };

    const handleOnClick = async (event) => {
        event.preventDefault();
        await handleLogin();
    };

    const handleDisabled = () => {
        return !(loginForm.email.value && loginForm.password.value && loginForm.password.value.length>=8);
    };

    const renderLogin = () => {
        return(
            <div className="container login">
                <ImageHeader/>
                <div>
                    <form>
                        {Object.keys(loginForm).map((field) => 
                            <Input elementType={loginForm[`${field}`].elementType} label={loginForm[`${field}`].label} 
                                value={loginForm[`${field}`].value} elementConfig={loginForm[`${field}`].elementConfig} 
                                handleOnChange={handleOnChange} style={inputStyle}/>)}
                    </form>
                </div>
                <div className="a form">
                    <Link to="/signup">
                        Não é cadastrado?
                    </Link>
                </div>
                <div>
                    <Button id="btn login" disabled={handleDisabled()} buttonText="Login" handleOnClick={handleOnClick}/>
                </div>
                <div>
                    {alertMessage && (<AlertBox message={alertMessage}/>)}
                </div>
            </div>
        );

    };

    return(
        <>
            <Helmet>
                <title>Webarber - Login</title>
            </Helmet>
            {!loading ? renderLogin() : <Loading/>}
        </>
    );
};

export default Login;