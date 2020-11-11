import './Login.css';
import Helmet from 'react-helmet';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Input from '../UI/Forms/Input/Input';
import Button from '../UI/Button/Button';
import ImageHeader from '../UI/ImageHeader/ImageHeader';
import NavBar from '../UI/NavBar/NavBar';
import {Link} from 'react-router-dom';

const url = process.env.REACT_APP_BASE_URL;

const Login = (props) => {
    // const { setWebarberUser } = useContext(UserContext);
    let history = useHistory();
    const [alertMessage, setAlertMessage ] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loginForm, setLoginForm] = useState(
        {
            email:{
                elementType: 'input',
                elementConfig:{
                    id: 'email',
                    name:'email',
                    type: 'text',
                    placeholder: 'E-mail'
                },
                label: 'E-mail',
                value: ''
            },
            password:{
                elementType: 'input',
                elementConfig:{
                    id: 'password',
                    name:'password',
                    type: 'password',
                    placeholder: 'Senha',
                    minLength:'8'
                },
                label: 'Senha',
                value: ''
            }
        })

    const handleLogin = async() => {
        setAlertMessage(null);
        setLoading(true);
        let user = {email: loginForm.email.value, password: loginForm.password.value};
        try{
            let response = await fetch(`${url}/login`, { method:'post',
                                headers: new Headers(
                                {'Content-Type': 'application/json'}
                                ),
                                body: JSON.stringify(user)
                            }
            )
            if(response.status === 200){
                let {id, nome, idTipo, sessionToken} = await response.json();
                let webarberUser = {id: id, nome: nome, idTipo: idTipo, sessionToken: sessionToken};
                localStorage.setItem('webarberUser', JSON.stringify(webarberUser));
                alert("Logged in")
                history.push('/');
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
    }

    const handleOnChange = (event) => {
        setLoginForm({...loginForm, [event.target.name]:{ 
                ...loginForm[event.target.name], value: event.target.value}});
    }


    const renderAlert = () => {
        return (
            <div className="alert alert-danger"role="alert">
                <strong>{alertMessage}</strong>
            </div>   
        )
    }
    
    const inputStyle = {
        width:"50%", 
        display:"flex", 
        margin:"auto auto"
    }

    const buttonStyle = {
        marginTop: "2%"
    }
    
    const handleOnClick = async (event) => {
        event.preventDefault();
        await handleLogin();
    }

    const handleDisabled = () => {
        return !(loginForm.email.value && loginForm.password.value);
    }

    const renderLogin = () =>{
        return(
            <div className="container login">
                <ImageHeader></ImageHeader>
                <div>
                    {Object.keys(loginForm).map(field=> <Input label={loginForm[field].label} value={loginForm[field].value} elementConfig={loginForm[field].elementConfig} handleOnChange={handleOnChange} style={inputStyle}></Input>)}
                </div>
                <div>
                    <Button disabled={handleDisabled()} buttonText="Login" handleOnClick={handleOnClick} style={buttonStyle}></Button>
                </div>
                <div>
                    {alertMessage && renderAlert()}
                </div>
                <div className="a signup">
                    <Link to="/signup">
                        Não é cadastrado?
                    </Link>
                </div>
            </div>
        )

    }

    return(
        <>
            <Helmet>
                <title>Webarber - Login</title>
            </Helmet>
            {!loading ? renderLogin() : <div>loading</div>}
        </>
    )
}

export default Login;