import React, { useContext }  from 'react';
import { UserContext } from '../User/UserContext'
import { Helmet } from 'react-helmet';
import NavBar from '../../Components/UI/NavBar/NavBar'
import Button from '../../Components/UI/Button/Button'
import FormularioBarbearia from './Formulario/FormularioBarbearia'

const url = process.env.REACT_APP_BASE_URL;

const CadastrarBarbearia = () => {
    const { webarberUser } = useContext(UserContext);

    const handleCreateBarbearia = async (formData) => {
        let createBarbearia = {...Object.keys(formData).reduce((obj, prop) => ({...obj, [prop]: formData[prop].value}), {}), user_id:1};
        createBarbearia.horarioAbertura = new Date().setHours(createBarbearia.horarioAbertura.split(":"));
        createBarbearia.horarioFechamento = new Date().setHours(createBarbearia.horarioFechamento.split(":"));
        const response = await fetch(`${url}/barbearias`, {method: "post",
                                                           headers: new Headers({"Content-Type": "application/json",
                                                                                  "Authorization": `Bearer ${webarberUser.sessionToken}`}),
                                                           body: JSON.stringify(createBarbearia)});
        if(response.status === 201){
            alert("Barbearia cadastrada com sucesso");
            // history.push("/");
        }
        else{
            const { message } = await response.json();
            alert(message);
        }
    }
    
    return (
            <>
            <Helmet>
                <title>Cadastrar Barbearia</title>
            </Helmet>
            <div>
                <NavBar/>
                    <FormularioBarbearia handleOnSubmitActiom={handleCreateBarbearia}/>
                <Button disabled={false} id="btn cadastrarBarbearia" form="barbearia-form" type="submit" content="submit" buttonText="Cadastrar Barbearia" style ={{margin:"10px auto"}}/>
            </div>
            </>
    )
}
export default CadastrarBarbearia;