import './Signup.css'
import Helmet from 'react-helmet';
import Button from '../UI/Button/Button';
import Input from '../UI/Forms/Input/Input';
import { useHistory } from 'react-router-dom';
import React, { useState } from 'react';
import ImageHeader from '../UI/ImageHeader/ImageHeader';


const NewSignUp = ({email, password}) => {
    let history = useHistory();
    const[signUpForm, setSignUpForm] = useState ({
        nome:{
            elementType: 'input',
            elementConfig:{
                id:'nome',
                name:'nome',
                type:'text',
                placeholder:"Nome"
            },
            label: 'Nome',
            value: ''
        },
        sobrenome:{
            elementType: 'input',
            elementConfig:{
                id:'sobrenome',
                name:'sobrenome',
                type:'text',
                placeholder:"Sobrenome"
            },
            label: 'Sobrenome',
            value: ''
        },
        tipoPessoa:{
            elementType: 'input',
            elementConfig:{
                id:'tipoPessoa',
                name:'tipoPessoa',
                type:'text',
                placeholder:"Tipo Pessoa"
            },
            label: 'Tipo Pessoa',
            value: ''
        },          
        CPF:{
            elementType: 'input',
            elementConfig:{
                id:'cpf',
                name:'cpf',
                type:'text',
                placeholder:"",
                mask:'999.999.999-99'
                //'99.999.999/9999-9' 
            },
            label: 'CPF',
            value: ''
        },
        email:{
            elementType: 'input',
            elementConfig:{
                id:'email',
                name:'email',
                type:'text',
                placeholder:"E-mail"
            },
            label: 'E-mail',
            value: ''
        },     
        confirmacaoEmail:{
            elementType: 'input',
            elementConfig:{
                id:'confirmacaoEmail',
                name:'confirmacaoEmail',
                type:'email',
                placeholder:"E-mail"
            },
            label: 'Confirme seu email',
            value: ''
        },     
        password:{
            elementType: 'input',
            elementConfig:{
                id:'password',
                name:'password',
                type:'password'
            },
            label: 'Senha',
            value: ''
        },     
        confirmacaoPassword:{
            elementType: 'input',
            elementConfig:{
                id:'confirmePassword',
                name:'confirmePassword',
                type:'password'
            },
            label: 'Confirme sua senha',
            value: ''
        },        
        idTipo:{
            elementType: 'input',
            elementConfig:{
                id:'idTipo',
                name:'idTipo',
                type:'text',
                placeholder:""
            },
            label: 'Id Tipo',
            value: ''
        },                             
    })
    console.log(signUpForm)

    const handleOnChange = (event) => {
            setSignUpForm({...signUpForm, [event.target.name]:{ 
                    ...signUpForm[event.target.name], value: event.target.value}});
        }
    
    return (
        <div>
            <ImageHeader></ImageHeader>
            {Object.keys(signUpForm).map(field=> <Input label={signUpForm[field].label} value={signUpForm[field].value} elementConfig={signUpForm[field].elementConfig} handleOnChange={handleOnChange}></Input>)}
        </div>
    )
} 

export default NewSignUp;