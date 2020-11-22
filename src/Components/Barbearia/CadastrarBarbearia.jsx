import React, { useContext, useState }  from "react";
import { UserContext } from "../User/UserContext";
import { Helmet } from "react-helmet";
import NavBar from "../../Components/UI/NavBar/NavBar";
import Button from "../../Components/UI/Button/Button";
import Loading from "../../Components/UI/Loading/Loading";
import FormularioBarbearia from "./Formulario/FormularioBarbearia";

const url = process.env.REACT_APP_BASE_URL;

const CadastrarBarbearia = () => {
    const { webarberUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);

    const handleCreateBarbearia = async (formData) => {
        setLoading(true);
        let createBarbearia = {...Object.keys(formData).reduce((obj, prop) => ({...obj, [`${prop}`]: formData[`${prop}`].value}), {}), user_id: webarberUser.user_id};

        createBarbearia.horarioAbertura = new Date().setHours(...createBarbearia.horarioAbertura.split(":"));
        createBarbearia.horarioFechamento = new Date().setHours(...createBarbearia.horarioFechamento.split (":"));

        const response = await fetch(`${url}/barbearias`, {
            method: "post",
            headers: new Headers({
                "Content-Type": "application/json","Authorization": `Bearer ${webarberUser.sessionToken}`
            }),
            body: JSON.stringify(createBarbearia)
        });

        if (response.status === 201) {
            alert("Barbearia cadastrada com sucesso");
        } else {
            const { message } = await response.json();
            alert(message);
        }
        setLoading(false);
    };
    
    const renderForm = () => {
            return (
                <div>
                    <NavBar/>
                    <FormularioBarbearia handleOnSubmitActiom={handleCreateBarbearia}/>
                    <Button disabled={false} id="btn cadastrarBarbearia" form="barbearia-form" type="submit" content="submit" buttonText="Cadastrar Barbearia" style ={{margin:"10px auto"}}/>
                </div>
            ); 
    };
    
    return (
            <>
            <Helmet>
                <title>Cadastrar Barbearia</title>
            </Helmet>
            {!loading ? renderForm(): <Loading/>}
            </>
    );
}

export default CadastrarBarbearia;