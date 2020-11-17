import React, { useState, useContext, useEffect } from 'react';
import { UserContext } from '../User/UserContext';
import { Helmet } from 'react-helmet';
import NavBar from '../UI/NavBar/NavBar';
import Loading from '../UI/Loading/Loading';
import Button from '../UI/Button/Button';
import FormularioBarbearia from './Formulario/FormularioBarbearia';

const url = process.env.REACT_APP_BASE_URL;

const EditarBarbearia = () => {
    const { webarberUser } = useContext(UserContext);
    const [dadosBarbearia, setDadosBarbearia] = useState();
    const [loading, setLoading] = useState(true);

    const fetchDadosBarbearia = async () => {
        setLoading(true);
        let response = await fetch(`${url}/barbearia/`, {method: 'get',
                                                        headers: new Headers({"Content-Type": "application/json",
                                                                              "Authorization": `Bearer ${webarberUser.sessionToken}`})})
        if(response.status === 200){
            let json = await response.json();
            setDadosBarbearia(json);
        }
        else{
            console.log(response)
            alert('erro');
        }
    }
    
    useEffect(()=>{
        fetchDadosBarbearia();
    }, [])


    const  renderNotFound = () => {
        return (
            <>
                <NavBar/>
                <h3 style={{justifyContent:"center",display:"flex", margin:"auto", color:"red", marginTop:"1%", width:"auto"}}> {"Não foi possível encontrar a barbearia selecionada."}</h3>
            </>
        )
    }

    const handleEditBarbearia = async (formData) => {
        setLoading(true);
        try{
            let editBarbearia = {...Object.keys(formData).reduce((obj, prop) => ({...obj, [prop]: formData[prop].value}), {}), user_id:1};
            editBarbearia.horarioAbertura = new Date().setHours(editBarbearia.horarioAbertura.split(":"));
            editBarbearia.horarioFechamento = new Date().setHours(editBarbearia.horarioFechamento.split(":"));
            const response = await fetch(`${url}/barbearias/`, {
                method: "PATCH",
                headers: new Headers({
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${webarberUser.sessionToken}`
                }),
                body: JSON.stringify(editBarbearia)
            });
            console.log(response);
            console.log(editBarbearia)
            if (response.status === 200) {
                alert("Barbearia alterada com sucesso.");
            } else {
                const { message } = await response.json();
                alert(message);
            }
        }
        catch(err){
            console.log(err);
        }
        setLoading(false);
    }

    
    const renderForm = () =>{
        return (
            <div>
                <NavBar/>
                <FormularioBarbearia dadosBarbearia={dadosBarbearia} handleOnSubmitActiom={handleEditBarbearia}/>
                <Button id="btn editarBarbearia" form="barbearia-form" type="submit" content="submit" buttonText="Salvar Alterações" style={{margin:"10px auto"}}/>
            </div>
        )
    }

    const renderEditBarbearia = () => {
        return(!dadosBarbearia ? renderNotFound() : renderForm())
    }

    return (
            <>
            <Helmet>
                <title>Editar Barbearia</title>
            </Helmet>
            {loading && !webarberUser ? <Loading/> : renderEditBarbearia()}
            </>
    )
}
export default EditarBarbearia;