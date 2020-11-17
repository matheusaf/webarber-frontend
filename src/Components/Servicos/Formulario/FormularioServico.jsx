import React, { useState, useEffect, useContext } from "react";
import Input from "../../UI/Forms/Input/Input";
import Button from "../../UI/Button/Button";
import NavBar from "../../UI/NavBar/NavBar";
import Loading from "../../UI/Loading/Loading";
import { UserContext } from "../../User/UserContext";

const url = process.env.REACT_APP_BASE_URL;

const CadastrarServico = () => {
	const { webarberUser } = useContext(UserContext);
	const [servicoForm, setServicoForm] = useState({
		titulo: {
			elementType: "input",
			elementConfig:{
				id: "titulo",
				name:"titulo",
				type: "text",
				placeholder: "Título do serviço"
			},
			label: "Título Serviço",
			value: ""
		},
		preco: {
			elementType: "input",
			elementConfig:{
				id: "preco",
				name:"preco",
				type: "text",
				placeholder: "Preço"
			},
			label: "Preço Serviço",
			value: ""
		},
		descricao: {
			elementType: "textarea",
			elementConfig:{
				id: "descricao",
				name:"descricao",
				type: "text",
				placeholder: "Descrição"
			},
			label: "descricao",
			value: ""
		}
	});

	const handleOnClick = async () => {
		try {
			let barbeariaId = await fetch(`${url}/barbearia`, {
				method: "get",
				headers: new Headers({
					"Content-Type": "application/json","Authorization": `Bearer ${webarberUser.sessionToken}`
				}),
			});
			
			if (barbeariaId.status === 201)
				throw new Error(barbeariaId.body.message)
			
			barbeariaId = await barbeariaId.json();
			
			let formData = Object.keys(servicoForm).reduce((obj, field) => ({...obj, [field]: servicoForm[field].value}), {})
			formData.barbearia_id = barbeariaId.id;
			console.log(formData);
			
			const response = await fetch(`${url}/servicos`, {
				method: "post",
				headers: new Headers({
					"Content-Type": "application/json","Authorization": `Bearer ${webarberUser.sessionToken}`
				}),
				body: JSON.stringify(formData)
			});
			
			if (response.status !== 201) {
				throw new Error(response.body.message || "Não foi possível criar o serviço");
			}

			alert("Serviço criado");
		} catch (err) {
			alert(err.message);
			console.log(err);
		}
	}

	const handleOnChange = (event) => {
		setServicoForm({...servicoForm, [event.target.name]: {
			...servicoForm[event.target.name], value: event.target.value
		}})
	}
	return (
		<>
			<NavBar/>
			{Object.keys(servicoForm).map(field => 
				<Input elementType={servicoForm[field].elementType} elementConfig={servicoForm[field].elementConfig}
						label={servicoForm[field].label} value={servicoForm[field].value}
						handleOnChange={handleOnChange}/>)}
			<Button buttonColors={1} buttonText="Adicionar Serviço" handleOnClick={handleOnClick} style={{margin: "auto auto", display:"flex", justifyContent:"center" }}/>
		</>
	)
}

export default CadastrarServico;