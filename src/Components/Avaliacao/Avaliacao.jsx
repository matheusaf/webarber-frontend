import React, { useState, useEffect, useContext } from "react";
import { UserContext } from '../User/UserContext';
import Helmet from "react-helmet";
import Button from "../UI/Button/Button";
import NavBar from "../UI/NavBar/NavBar";
import Input from "../UI/Forms/Input/Input";

const url = process.env.REACT_APP_BASE_URL;

const Avaliacao = () => {
	const { webarberUser } = useContext(UserContext);
	const [dadosAvaliacao, setDadosAvaliacao] = useState({
		titulo: {
			elementType: "input",
			elementConfig: {
				id: "titulo",
				nome: "titulo",
				type: "text",
			},
			label: "Titulo",
			value: localStorage.getItem("nome_servico"),
			readOnly:true
		},
		descricao: {
			elementType: "input",
			elementConfig: {
				id: "descricao",
				nome: "descricao",
				type: "text",
			},
			label: "descricao",
			value: "",
			readOnly:true
		},
		nota: {
			elementType: "input",
			elementConfig: {
				id: "nota",
				nome: "nota",
				type: "number",
			},
			label: "Nota",
			value: "",
			readOnly:false
		},
	})


	useEffect(() => {
		if(webarberUser){

		}
	}, [webarberUser]);

	const handleOnChange = (event) => {
		setDadosAvaliacao({...dadosAvaliacao, [`${event.target.name}`]: {
			...dadosAvaliacao[`${event.target.name}`], value: event.target.value
		}})
	}

	const handleOnClick = async () => {
		try {
			let response = await fetch(`${url}/avaliacoes`, {
				method: "post",
				body: JSON.stringify(idAgendamento: url),
				headers: new Headers({
					"Content-type" : "application/json", 
					"Authorization" : `Bearer ${webarberUser.sessionToken}`
				})
			});
			
			if (response.status === 200) {
				alert("Serviço avaliado");
			} else {
				alert("Não foi possível avaliar o serviço");
			}
		} catch (error) {
			alert(error);
		}

	}

	const buttonStyle ={
		margin: "10px auto",
		display: "flex",
		justifyContent: "center"
	}

	return (
		<>
		<Helmet>
			<title>Avaliação</title>
		</Helmet>
		<div>
			<NavBar/>
		</div>
		<div>
			{Object.keys(dadosAvaliacao).map((field) => 
			<Input elementType={dadosAvaliacao[`${field}`].elementType} elementConfig={dadosAvaliacao[`${field}`].elementConfig} 
					label={dadosAvaliacao[`${field}`].label} value={dadosAvaliacao[`${field}`].value}
					readOnly={dadosAvaliacao[`${field}`].value} handleOnChange={handleOnChange} />)}
		</div>
		<div>
			<Button buttonColors={2} buttonText="Salvar Avaliação" handleOnClick={handleOnClick} style={buttonStyle}/>
		</div>

		</>
	);
}

export default Avaliacao;